import { body } from "express-validator";

export const createValidators = [
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

export const updateValidators = [
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
  body("address").optional().isString().withMessage("Adresse invalide"),
];

export const addEmployeeValidators = [
  body("userId")
    .optional()
    .isMongoId()
    .withMessage("Identifiant utilisateur invalide"),
  body("email").optional().isEmail().withMessage("Email invalide"),
  body("name").optional().isString().withMessage("Nom invalide"),
  body("phone").optional().isString().withMessage("Téléphone invalide"),
];

export const updateEmployeeValidators = [
  body("name").optional().isString().withMessage("Nom invalide"),
  body("email").optional().isEmail().withMessage("Email invalide"),
  body("phone").optional().isString().withMessage("Téléphone invalide"),
  body("isActive").optional().isBoolean().withMessage("isActive invalide"),
];
