import express from "express";
import AuthController from "../controllers/authController";
import {
  emailValidateur,
  loginValidateur,
  registerValidateur,
  resetValidateur,
  tokenValidateur,
} from "../validator/authValidator";

const authRoutes = express.Router();

authRoutes.post("/register", registerValidateur, AuthController.register);
authRoutes.post("/login", loginValidateur, AuthController.login);
authRoutes.post("/validate", tokenValidateur, AuthController.validate);
authRoutes.post(
  "/message/validate",
  emailValidateur,
  AuthController.validateMessage
);
authRoutes.post("/reset", resetValidateur, AuthController.reset);
authRoutes.post("/message/reset", emailValidateur, AuthController.resetMessage);

export default authRoutes;
