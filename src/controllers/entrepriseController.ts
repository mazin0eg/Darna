import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import Entreprise from "../models/Entreprise";
import EntrepriseEmploye from "../models/EntrepriseEmploye";
import User from "../models/User";

class EntrepriseController {
  static createValidators = [
    body("name").exists().withMessage("Le nom est requis").isLength({ min: 2 }).withMessage("Le nom est trop court"),
    body("description").optional().isLength({ max: 500 }).withMessage("La description est trop longue"),
    body("phone").optional().isMobilePhone("any").withMessage("Numéro de téléphone invalide"),
    body("address").optional().isString().withMessage("Adresse invalide"),
  ];

  static updateValidators = [
    body("name").optional().isLength({ min: 2 }).withMessage("Le nom est trop court"),
    body("description").optional().isLength({ max: 500 }).withMessage("La description est trop longue"),
    body("phone").optional().isString().withMessage("Numéro de téléphone invalide"),
    body("address").optional().isString().withMessage("Adresse invalide"),
  ];

  
  static addEmployeeValidators = [
    body("userId").optional().isMongoId().withMessage("Identifiant utilisateur invalide"),
    body("email").optional().isEmail().withMessage("Email invalide"),
    body("name").optional().isString().withMessage("Nom invalide"),
    body("phone").optional().isString().withMessage("Téléphone invalide"),
  ];

  static updateEmployeeValidators = [
    body("name").optional().isString().withMessage("Nom invalide"),
    body("email").optional().isEmail().withMessage("Email invalide"),
    body("phone").optional().isString().withMessage("Téléphone invalide"),
    body("isActive").optional().isBoolean().withMessage("isActive invalide"),
  ];

  static async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.error(errors.array()[0].msg, 400);

      const user = req.user;
      if (!user) return res.error("Authentification requise", 401);

      const { name, description, phone, address } = req.body;

      const entreprise = new Entreprise({
        name,
        description,
        creatorId: user.userId,
        phone,
        address,
      });

      await entreprise.save();
      return res.success({ entreprise }, "Entreprise créée avec succès", 201);
    } catch (error) {
      console.error("Erreur création entreprise:", error);
      return res.error("Impossible de créer l'entreprise", 500, error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.error(errors.array()[0].msg, 400);

      const user = req.user;
      if (!user) return res.error("Authentification requise", 401);

      const entrepriseId = req.params.id;
      const entreprise = await Entreprise.findById(entrepriseId);
      if (!entreprise) return res.error("Entreprise non trouvée", 404);

      const isOwner = entreprise.creatorId.toString() === user.userId;
      if (!isOwner && user.role !== "admin") return res.error("Accès non autorisé", 403);

      const allowed = ["name", "description", "phone", "address"];
      const updates: any = {};
      for (const key of allowed) {
        if (req.body[key] !== undefined) updates[key] = req.body[key];
      }

      if (Object.keys(updates).length === 0) return res.error("Aucun champ à mettre à jour", 400);

      const updated = await Entreprise.findByIdAndUpdate(entrepriseId, updates, { new: true });
      return res.success({ entreprise: updated }, "Entreprise mise à jour", 200);
    } catch (err) {
      console.error("Erreur mise à jour entreprise:", err);
      return res.error("Impossible de mettre à jour l'entreprise", 500, err);
    }
  }

  static async remove(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.error("Authentification requise", 401);

      const entrepriseId = req.params.id;
      const entreprise = await Entreprise.findById(entrepriseId);
      if (!entreprise) return res.error("Entreprise non trouvée", 404);

      const isOwner = entreprise.creatorId.toString() === user.userId;
      if (!isOwner && user.role !== "admin") return res.error("Accès non autorisé", 403);

      
      await Entreprise.findByIdAndDelete(entrepriseId);
      await EntrepriseEmploye.deleteMany({ entrepriseId });

      return res.success(null, "Entreprise supprimée", 200);
    } catch (err) {
      console.error("Erreur suppression entreprise:", err);
      return res.error("Impossible de supprimer l'entreprise", 500, err);
    }
  }

  static async addEmployee(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.error(errors.array()[0].msg, 400);

      const user = req.user;
      if (!user) return res.error("Authentification requise", 401);

      const entrepriseId = req.params.id;
      const entreprise = await Entreprise.findById(entrepriseId);
      if (!entreprise) return res.error("Entreprise non trouvée", 404);

      const isOwner = entreprise.creatorId.toString() === user.userId;
      if (!isOwner && user.role !== "admin") return res.error("Accès non autorisé", 403);

      
      let userId: string | undefined = req.body.userId;
      const emailFromBody = req.body.email;
      const nameFromBody = req.body.name;
      const phoneFromBody = req.body.phone;

      let targetUser: any = null;

      if (userId) {
        targetUser = await User.findById(userId);
        if (!targetUser) return res.error("Utilisateur non trouvé", 404);
      } else if (emailFromBody) {
        
        targetUser = await User.findOne({ email: emailFromBody });
        if (!targetUser) {
         
          const usernameBase = emailFromBody.split("@")[0];
          const username = `${usernameBase}_${Math.floor(Math.random() * 10000)}`;
          const rawPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4);
          const hashed = await bcryptjs.hash(rawPassword, 10);
          const names = (nameFromBody || "").split(" ");
          const firstName = names.length > 0 ? names[0] : undefined;
          const lastName = names.length > 1 ? names.slice(1).join(" ") : undefined;

          const newUser = new User({
            email: emailFromBody,
            password: hashed,
            username,
            firstName,
            lastName,
            role: "employé",
           
            email_verified: false,
            isActive: true,
          });
          await newUser.save();
          targetUser = newUser;
        }
        userId = targetUser._id.toString();
      } else {
        return res.error("userId ou email requis pour ajouter un employé", 400);
      }

      const name = nameFromBody || [targetUser.firstName, targetUser.lastName].filter(Boolean).join(" ") || targetUser.username;
      const email = emailFromBody || targetUser.email;
      const phone = phoneFromBody || (targetUser as any).phone_number;

      const doc = new EntrepriseEmploye({
        entrepriseId,
        userId,
        role: "employé",
        name,
        email,
        phone,
      });

      try {
        await doc.save();
      } catch (err: any) {
        if (err && err.code === 11000) {
          return res.error("Cet employé est déjà affecté à l'entreprise", 409);
        }
        throw err;
      }

      return res.success({ employee: doc }, "Employé ajouté", 201);
    } catch (err) {
      console.error("Erreur ajout employé:", err);
      return res.error("Impossible d'ajouter l'employé", 500, err);
    }
  }

  static async updateEmployee(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.error(errors.array()[0].msg, 400);

      const user = req.user;
      if (!user) return res.error("Authentification requise", 401);

      const entrepriseId = req.params.id;
      const entreprise = await Entreprise.findById(entrepriseId);
      if (!entreprise) return res.error("Entreprise non trouvée", 404);

      const employeeId = req.params.employeeId;
      const employee = await EntrepriseEmploye.findById(employeeId);
      if (!employee) return res.error("Employé non trouvé", 404);

     
      if (employee.entrepriseId.toString() !== entrepriseId) return res.error("Cet employé n'appartient pas à l'entreprise", 400);

      const isOwner = entreprise.creatorId.toString() === user.userId;
      const isAdmin = user.role === "admin";
      const isSelf = employee.userId.toString() === user.userId;

      if (!isOwner && !isAdmin && !isSelf) return res.error("Accès non autorisé", 403);

      const allowed = ["name", "email", "phone", "isActive"];
      const updates: any = {};
      for (const key of allowed) {
        if (req.body[key] !== undefined) updates[key] = req.body[key];
      }

      if (Object.keys(updates).length === 0) return res.error("Aucun champ à mettre à jour", 400);

      const updated = await EntrepriseEmploye.findByIdAndUpdate(employeeId, updates, { new: true });
      return res.success({ employee: updated }, "Employé mis à jour", 200);
    } catch (err) {
      console.error("Erreur mise à jour employé:", err);
      return res.error("Impossible de mettre à jour l'employé", 500, err);
    }
  }

  static async removeEmployee(req: Request, res: Response) {
    try {
      const user = req.user;
      if (!user) return res.error("Authentification requise", 401);

      const entrepriseId = req.params.id;
      const entreprise = await Entreprise.findById(entrepriseId);
      if (!entreprise) return res.error("Entreprise non trouvée", 404);

      const employeeId = req.params.employeeId;
      const employee = await EntrepriseEmploye.findById(employeeId);
      if (!employee) return res.error("Employé non trouvé", 404);

      
      if (employee.entrepriseId.toString() !== entrepriseId) return res.error("Cet employé n'appartient pas à l'entreprise", 400);

      const isOwner = entreprise.creatorId.toString() === user.userId;
      const isAdmin = user.role === "admin";
      const isSelf = employee.userId.toString() === user.userId;

      if (!isOwner && !isAdmin && !isSelf) return res.error("Accès non autorisé", 403);

      await EntrepriseEmploye.findByIdAndDelete(employeeId);
      return res.success(null, "Employé supprimé", 200);
    } catch (err) {
      console.error("Erreur suppression employé:", err);
      return res.error("Impossible de supprimer l'employé", 500, err);
    }
  }
}

export default EntrepriseController;

