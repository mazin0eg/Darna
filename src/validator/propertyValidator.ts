import { body } from "express-validator";

export const createValidators = [
  body("titre")
    .exists()
    .withMessage("Le titre est requis")
    .isLength({ min: 3 })
    .withMessage("Le titre est trop court"),
  body("type_transaction")
    .exists()
    .withMessage("Le type de transaction est requis")
    .isIn([
      "vente",
      "location_journaliere",
      "location_mensuelle",
      "location_longue_duree",
      "location_saisonniere",
    ])
    .withMessage("Type de transaction invalide"),
  body("prix")
    .optional()
    .isNumeric()
    .withMessage("Le prix doit être un nombre"),
  body("prix_par_jour")
    .optional()
    .isNumeric()
    .withMessage("Le prix par jour doit être un nombre"),

  body("localisation.coordonnees")
    .optional()
    .custom((value) => {
      if (!Array.isArray(value) || value.length !== 2) return false;
      const [lng, lat] = value;
      return typeof lng === "number" && typeof lat === "number";
    })
    .withMessage(
      "localisation.coordonnees doit être un tableau [longitude, latitude]"
    ),
];

export const updateValidators = [
  body("titre")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Le titre est trop court"),
  body("type_transaction")
    .optional()
    .isIn([
      "vente",
      "location_journaliere",
      "location_mensuelle",
      "location_longue_duree",
      "location_saisonniere",
    ])
    .withMessage("Type de transaction invalide"),
];

export default { createValidators, updateValidators };
