import express from "express";
import PropertyController from "../controllers/propertyController";
import { authenticate } from "../middleware/auth";
import { createValidators, updateValidators } from "../validator/propertyValidator";

const router = express.Router();

router.post("/", authenticate, createValidators, PropertyController.create);
router.patch("/:id", authenticate, updateValidators, PropertyController.update);

export default router;

export {};
