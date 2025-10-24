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

    body("address")
        .optional()
        .isString()
        .withMessage("Adresse invalide"),
  ];

  static updateValidators = [
    
    body("name")
      .optional()
      .isLength({ min: 2 })
      .withMessage("Le nom est trop court"),

    body("description")
      .optional()
      .isLength({ max: 500 })
      .withMessage("La description est trop longue"),

    body("phone")
      .optional()
      .isString()
      .withMessage("Numéro de téléphone invalide"),
      
    body("address")
      .optional()
      .isString()
      .withMessage("Adresse invalide"),
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

  static async update(req: Request, res: Response) {
    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
        return res.error(errors.array()[0].msg, 400);

      const user = req.user;
      if (!user) 
        return res.error("Authentification requise", 401);

      const entrepriseId = req.params.id;
      const entreprise = await Entreprise.findById(entrepriseId);
      if (!entreprise) 
        return res.error("Entreprise non trouvée", 404);

      const isOwner = entreprise.creatorId.toString() === user.userId;
      if (!isOwner && user.role !== "admin") 
        return res.error("Accès non autorisé", 403);

      const allowed = ["name", "description", "phone", "address"];
      const updates: any = {};
      for (const key of allowed) {
        if (req.body[key] !== undefined) updates[key] = req.body[key];
      }

      if (Object.keys(updates).length === 0) 
        return res.error("Aucun champ à mettre à jour", 400);

      const updated = await Entreprise.findByIdAndUpdate(entrepriseId, updates, { new: true });
      return res.success({ entreprise: updated }, "Entreprise mise à jour", 200);
    } catch (err) {
      console.error("Erreur mise à jour entreprise:", err);
      return res.error("Impossible de mettre à jour l'entreprise", 500, err);
    }
  }

}

export default EntrepriseController;
