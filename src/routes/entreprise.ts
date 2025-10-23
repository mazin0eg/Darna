import express from "express";
import EntrepriseController from "../controllers/entrepriseController";
import { authenticate } from "../middleware/auth";

const router = express.Router();


router.post("/", authenticate, EntrepriseController.createValidators, EntrepriseController.create);


export default router;
