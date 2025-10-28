import type { Request, Response } from "express";
import Property from "../models/Property";
import Entreprise from "../models/Entreprise";
import EntrepriseEmploye from "../models/EntrepriseEmploye";

class PropertyController {
  static async create(req: Request, res: Response) {
    try {
      const user = req.user;
      const {
        titre,
        description,
        type_transaction,
        prix,
        prix_par_jour,
        disponibilites,
        localisation,
        caracteristiques,
        diagnostics_energetiques,
        medias,
      } = req.body;

      const doc: any = {
        titre,
        description,
        type_transaction,
        prix,
        prix_par_jour,
        disponibilites,
        localisation,
        caracteristiques,
        diagnostics_energetiques,
        medias,
        creatorId: user.userId,
      };

      if (user.role === "employé") {
        const employe = await EntrepriseEmploye.findOne({
          userId: user.userId,
          isActive: true,
        });
        if (employe) {
          doc.createur_type = "employe_entreprise";
          doc.entrepriseId = employe.entrepriseId;
          const ent = await Entreprise.findById(employe.entrepriseId);
          if (ent) doc.entreprise_nom = ent.name;
        } else {
          doc.createur_type = "particulier";
        }
      } else {
        doc.createur_type = "particulier";
      }

      const property = new Property(doc);
      await property.save();

      return res.success({ annonce: property }, "Annonce créée", 201);
    } catch (err: any) {
      console.error("Erreur création annonce:", err);
      if (err && err.code === 11000) {
        return res.error("Conflit - clé unique", 409, err);
      }
      return res.error("Impossible de créer l'annonce", 500, err);
    }
  }
}

export default PropertyController;

export {};
