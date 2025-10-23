import { body } from "express-validator";

export const tokenValidateur = [
  body("token").exists().withMessage("Le token est requis"),
];

export const passwordValidateur = [
  body("password")
    .exists()
    .withMessage("Le champ mot de passe est requis")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];

export const confirmPasswordlidateur = [
  body("confirmPassword")
    .exists()
    .withMessage("La confirmation du mot de passe est requise"),
];

export const emailValidateur = [
  body("email")
    .exists()
    .withMessage("Le champ email est requis")
    .isEmail()
    .normalizeEmail()
    .withMessage("Veuillez fournir un email valide"),
];

export const registerValidateur = [
  body("firstName")
    .exists()
    .withMessage("Le champ prénom est requis")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Le prénom doit contenir entre 2 et 20 caractères"),

  body("lastName")
    .exists()
    .withMessage("Le champ nom est requis")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Le nom doit contenir entre 2 et 20 caractères"),

  emailValidateur,
  passwordValidateur,
  confirmPasswordlidateur,
];

export const loginValidateur = [passwordValidateur, passwordValidateur];

export const resetValidateur = [
  passwordValidateur,
  confirmPasswordlidateur,
  tokenValidateur,
];
