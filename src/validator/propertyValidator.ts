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

  // disponibilites
  body("disponibilites")
    .optional()
    .isArray()
    .withMessage("disponibilites doit être un tableau")
    .bail()
    .custom((arr: any) => {
      if (!Array.isArray(arr)) return false;
      for (const item of arr) {
        if (!item.debut || !item.fin) return false;
        const d = Date.parse(item.debut);
        const f = Date.parse(item.fin);
        if (Number.isNaN(d) || Number.isNaN(f)) return false;
        if (d > f) return false;
      }
      return true;
    })
    .withMessage(
      "Chaque disponibilité doit avoir 'debut' et 'fin' valides (ISO date) et debut <= fin"
    ),

  // localisation
  body("localisation.coordonnees")
    .optional()
    .custom((value: any) => {
      if (!Array.isArray(value) || value.length !== 2) return false;
      const [lng, lat] = value;
      return typeof lng === "number" && typeof lat === "number";
    })
    .withMessage(
      "localisation.coordonnees doit être un tableau [longitude, latitude]"
    ),

  // caracteristiques
  body("caracteristiques.superficie")
    .optional()
    .isNumeric()
    .withMessage("superficie doit être un nombre"),
  body("caracteristiques.nombre_chambres")
    .optional()
    .isInt()
    .withMessage("nombre_chambres doit être un entier"),
  body("caracteristiques.nombre_salles_de_bain")
    .optional()
    .isInt()
    .withMessage("nombre_salles_de_bain doit être un entier"),

  // medias
  body("medias")
    .optional()
    .isArray()
    .withMessage("medias doit être un tableau"),
  body("medias.*.url")
    .optional()
    .isString()
    .withMessage("medias.url doit être une chaîne"),
  body("medias.*.type")
    .optional()
    .isIn(["image", "video"])
    .withMessage("medias.type invalide"),

  body().custom((_, { req }) => {
    if (req.body && req.body.type_transaction === "vente") {
      if (req.body.prix === undefined || req.body.prix === null) {
        throw new Error(
          "Le champ 'prix' est requis pour une transaction de type 'vente'"
        );
      }
    }
    return true;
  }),
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

  body("prix")
    .optional()
    .isNumeric()
    .withMessage("Le prix doit être un nombre"),
  body("prix_par_jour")
    .optional()
    .isNumeric()
    .withMessage("Le prix par jour doit être un nombre"),

  body("disponibilites")
    .optional()
    .isArray()
    .withMessage("disponibilites doit être un tableau")
    .bail()
    .custom((arr: any) => {
      if (!Array.isArray(arr)) return false;
      for (const item of arr) {
        if (!item.debut || !item.fin) return false;
        const d = Date.parse(item.debut);
        const f = Date.parse(item.fin);
        if (Number.isNaN(d) || Number.isNaN(f)) return false;
        if (d > f) return false;
      }
      return true;
    })
    .withMessage(
      "Chaque disponibilité doit avoir 'debut' et 'fin' valides (ISO date) et debut <= fin"
    ),

  body("localisation.coordonnees")
    .optional()
    .custom((value: any) => {
      if (!Array.isArray(value) || value.length !== 2) return false;
      const [lng, lat] = value;
      return typeof lng === "number" && typeof lat === "number";
    })
    .withMessage(
      "localisation.coordonnees doit être un tableau [longitude, latitude]"
    ),

  body("caracteristiques.superficie")
    .optional()
    .isNumeric()
    .withMessage("superficie doit être un nombre"),
  body("caracteristiques.nombre_chambres")
    .optional()
    .isInt()
    .withMessage("nombre_chambres doit être un entier"),
  body("caracteristiques.nombre_salles_de_bain")
    .optional()
    .isInt()
    .withMessage("nombre_salles_de_bain doit être un entier"),

  body("medias")
    .optional()
    .isArray()
    .withMessage("medias doit être un tableau"),
  body("medias.*.url")
    .optional()
    .isString()
    .withMessage("medias.url doit être une chaîne"),
  body("medias.*.type")
    .optional()
    .isIn(["image", "video"])
    .withMessage("medias.type invalide"),

  body().custom((_, { req }) => {
    if (req.body && req.body.type_transaction === "vente") {
      if (req.body.prix === undefined || req.body.prix === null) {
        throw new Error(
          "Le champ 'prix' est requis pour une transaction de type 'vente'"
        );
      }
    }
    return true;
  }),
];

export default { createValidators, updateValidators };
