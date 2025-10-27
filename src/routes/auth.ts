import express from "express";
import AuthController from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.post("/validate", AuthController.validate);
authRoutes.post("/message/validate", AuthController.validateMessage);
authRoutes.post("/reset", AuthController.reset);
authRoutes.post("/message/reset", AuthController.resetMessage);

export default authRoutes;
