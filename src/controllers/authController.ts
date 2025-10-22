import type { Request, Response } from "express";

import bcryptjs from "bcryptjs";
import { passwordResetMail } from "../mailer/auth/authResetMail";
import { validateMail } from "../mailer/auth/authValidateMail";
import EmailValidation from "../models/EmailValidation";
import PasswordReset from "../models/PasswordReset";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

class AuthController {
  static sanitizeUserData = (userData: any) => {
    const userResponse = { ...userData.toObject() };
    delete userResponse.password;
    return userResponse;
  };

  static decryptEmailFromToken = (combinedToken: string) => {
    try {
      const encryptedPart = combinedToken.split(".")[1];
      if (!encryptedPart) return null;
      const decodedData = JSON.parse(
        Buffer.from(encryptedPart, "base64").toString()
      );
      return decodedData.email;
    } catch (error) {
      console.error("Error decrypting token:", error);
      return null;
    }
  };

  static async register(req: Request, res: Response) {
    try {
      const { email, password, confirmPassword, firstName, lastName } =
        req.body;
      if (password !== confirmPassword) {
        return res.error("Les mots de passe ne correspondent pas", 400);
      }
      const findUser = await User.find({ email });
      if (findUser.length > 0) {
        return res.error("Cet email est déjà utilisé", 409);
      }
      const hashedPassword = await bcryptjs.hash(password, 10);
      const username =
        email.split("@")[0] + "_" + Math.floor(Math.random() * 10000);
      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
      });
      try {
        await user.save();
        const mailResult = await validateMail(email);
        if (mailResult.success) {
          return res.success(
            { user: AuthController.sanitizeUserData(user) },
            `Utilisateur enregistré avec succès. ${mailResult.message}`,
            201
          );
        } else {
          return res.success(
            {
              user: AuthController.sanitizeUserData(user),
              emailWarning: true,
            },
            "Utilisateur enregistré avec succès, mais l'email de vérification n'a pas pu être envoyé. Veuillez réessayer plus tard.",
            201
          );
        }
      } catch (saveError) {
        console.error(
          "Erreur lors de l'insertion de l'utilisateur:",
          saveError
        );
        return res.error(
          "Échec de l'enregistrement de l'utilisateur",
          500,
          saveError
        );
      }
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.error("Email ou mot de passe invalide", 404);
      }
      if (!user.email_verified) {
        return res.error(
          "Votre compte n'est pas vérifié. Veuillez vérifier votre email.",
          403,
          { mailvalidationrequire: true }
        );
      }
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.error("Email ou mot de passe invalide", 401);
      }
      const userData = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      };
      const token = generateToken(userData);
      return res.success(
        { user: AuthController.sanitizeUserData(user), token },
        "Utilisateur connecté avec succès",
        200
      );
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async validate(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const email = AuthController.decryptEmailFromToken(token);
      const tokenData = await EmailValidation.findOne({ token });
      if (!tokenData || tokenData.email !== email) {
        return res.error(
          "Token invalide ou ne correspond pas à votre email",
          400
        );
      }
      const user = await User.findOneAndUpdate(
        { email },
        { email_verified: true },
        { new: true }
      );
      if (!user) {
        return res.error("Utilisateur non trouvé", 404);
      }
      await EmailValidation.deleteOne({ token });
      const userData = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      };
      const jwtToken = generateToken(userData);
      return res.success(
        { user: AuthController.sanitizeUserData(user), token: jwtToken },
        "Utilisateur connecté avec succès",
        200
      );
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async validateMessage(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.error("Utilisateur non trouvé", 404);
      }
      if (user.email_verified === true) {
        return res.success(
          null,
          "Votre compte est déjà vérifié. Vous pouvez vous connecter.",
          200
        );
      }
      const mailResult = await validateMail(email);
      if (mailResult.success) {
        return res.success(null, mailResult.message, 200);
      } else {
        return res.error(mailResult.message, 500);
      }
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async reset(req: Request, res: Response) {
    try {
      const { password, confirmPassword, token } = req.body;
      if (password !== confirmPassword) {
        return res.error("Les mots de passe ne correspondent pas", 400);
      }
      const email = AuthController.decryptEmailFromToken(token);
      const tokenData = await PasswordReset.findOne({ token });
      if (!tokenData || tokenData.email !== email) {
        return res.error(
          "Token invalide ou ne correspond pas à votre email",
          400
        );
      }
      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = await User.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true }
      );
      if (!user) {
        return res.error("Utilisateur non trouvé", 404);
      }
      await PasswordReset.deleteOne({ token });
      const userData = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      };
      const jwtToken = generateToken(userData);
      return res.success(
        { user: AuthController.sanitizeUserData(user), token: jwtToken },
        "Utilisateur connecté avec succès",
        200
      );
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async resetMessage(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.error("Utilisateur non trouvé", 404);
      }
      const mailResult = await passwordResetMail(email);
      if (mailResult.success) {
        return res.success(null, mailResult.message, 200);
      } else {
        return res.error(mailResult.message, 500);
      }
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }
}
export default AuthController;
