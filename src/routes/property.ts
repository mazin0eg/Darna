import express from "express";
import PropertyController from "../controllers/propertyController";
import { authenticate } from "../middleware/auth";
import { createValidators } from "../validator/propertyValidator";

const router = express.Router();

router.post("/", authenticate, createValidators, PropertyController.create);

export default router;

export {};
