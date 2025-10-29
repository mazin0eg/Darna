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

  static async update(req: Request, res: Response) {
    try {
      const user = req.user;
      const annonceId = req.params.id;
      const annonce = await Property.findById(annonceId);
      if (!annonce) return res.error("Annonce non trouvée", 404);

      const isOwner = annonce.creatorId && annonce.creatorId.toString() === user.userId;
      const isAdmin = user.role === "admin";
      let isEntrepriseMember = false;

      if (!isOwner && user.role === "employé" && annonce.entrepriseId) {
        const emp = await EntrepriseEmploye.findOne({
          userId: user.userId,
          entrepriseId: annonce.entrepriseId,
          isActive: true,
        });
        if (emp) isEntrepriseMember = true;
      }

      if (!isOwner && !isAdmin && !isEntrepriseMember)
        return res.error("Accès non autorisé", 403);

      const allowed = [
        "titre",
        "description",
        "type_transaction",
        "prix",
        "prix_par_jour",
        "disponibilites",
        "localisation",
        "caracteristiques",
        "diagnostics_energetiques",
        "medias",
      ];

      const updates: any = {};
      for (const key of allowed) {
        if (req.body[key] !== undefined) updates[key] = req.body[key];
      }

      if (Object.keys(updates).length === 0)
        return res.error("Aucun champ à mettre à jour", 400);

      const updated = await Property.findByIdAndUpdate(annonceId, updates, {
        new: true,
      });

      return res.success({ annonce: updated }, "Annonce mise à jour", 200);
    } catch (err: any) {
      console.error("Erreur mise à jour annonce:", err);
      return res.error("Impossible de mettre à jour l'annonce", 500, err);
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const user = req.user;
      const annonceId = req.params.id;
      const annonce = await Property.findById(annonceId);
      if (!annonce) return res.error("Annonce non trouvée", 404);

      const isOwner = annonce.creatorId && annonce.creatorId.toString() === user.userId;
      const isAdmin = user.role === "admin";
      let isEntrepriseMember = false;

      if (!isOwner && user.role === "employé" && annonce.entrepriseId) {
        const emp = await EntrepriseEmploye.findOne({
          userId: user.userId,
          entrepriseId: annonce.entrepriseId,
          isActive: true,
        });
        if (emp) isEntrepriseMember = true;
      }

      if (!isOwner && !isAdmin && !isEntrepriseMember)
        return res.error("Accès non autorisé", 403);

      await Property.findByIdAndDelete(annonceId);

      return res.success({}, "Annonce supprimée", 204);
    } catch (err: any) {
      console.error("Erreur suppression annonce:", err);
      return res.error("Impossible de supprimer l'annonce", 500, err);
    }
  }
}


export default PropertyController;

export {};
