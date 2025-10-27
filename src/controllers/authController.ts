import type { Request, Response } from "express";
import apiRequest from "../utils/apiRequest";

class AuthController {
  static async getAuthService(): Promise<string> {
    let AUTH_SERVICE: string = process.env.AUTH_SERVICE || "";
    const authServices = [
      process.env.AUTH_SERVICE,
      process.env.AUTH_SERVICE2,
      process.env.AUTH_SERVICE3,
    ];
    for (const s of authServices) {
      if (!s) continue;
      try {
        const response = await fetch(s, { method: "GET" });
        if (response.ok) {
          AUTH_SERVICE = s;
          return AUTH_SERVICE;
        }
      } catch (e: any) {
        console.log(`Service ${s} unavailable:`, e.message);
      }
    }
    return AUTH_SERVICE;
  }

  static async register(req: Request, res: Response) {
    try {
      const { email, password, confirmPassword, firstName, lastName } =
        req.body;
      const response = await apiRequest(
        `${process.env.AUTH_SERVICE}/register`,
        {
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
        },
        { method: "POST" }
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const authService = await AuthController.getAuthService();
      console.log(authService);
      if (!authService) {
        return res.error("Service d'authentification non disponible", 503);
      }

      const response = await apiRequest(
        `${authService}/login`,
        { email, password },
        { method: "POST" }
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async validate(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const response = await apiRequest(
        `${process.env.AUTH_SERVICE}/validate`,
        { token },
        { method: "POST" }
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async validateMessage(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await apiRequest(
        `${process.env.AUTH_SERVICE}/message/validate`,
        { email },
        { method: "POST" }
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async reset(req: Request, res: Response) {
    try {
      const { password, confirmPassword, token } = req.body;
      const response = await apiRequest(
        `${process.env.AUTH_SERVICE}/reset`,
        { password, confirmPassword, token },
        { method: "POST" }
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }

  static async resetMessage(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await apiRequest(
        `${process.env.AUTH_SERVICE}/message/reset`,
        { email },
        { method: "POST" }
      );
      res.json(response);
    } catch (error) {
      console.log(error);
      return res.error("Une erreur inattendue s'est produite", 500, error);
    }
  }
}

export default AuthController;
