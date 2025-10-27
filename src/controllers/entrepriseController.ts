import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Entreprise from "../models/Entreprise";

class EntrepriseController {
  static createValidators = [
    body("name")
      .exists()
      .withMessage("Le nom est requis")
      .isLength({ min: 2 })
      .withMessage("Le nom est trop court"),

    body("description")
      .optional()
      .isLength({ max: 500 })
      .withMessage("La description est trop longue"),

    body("phone")
      .optional()
      .isMobilePhone("any")
      .withMessage("Numéro de téléphone invalide"),

    body("address").optional().isString().withMessage("Adresse invalide"),
  ];

  static async create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.error(errors.array()[0].msg, 400);
      }

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
}

export default EntrepriseController;
