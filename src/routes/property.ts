import express from "express";
import PropertyController from "../controllers/propertyController";
import { authenticate } from "../middleware/auth";
import { createValidators, updateValidators } from "../validator/propertyValidator";
import { param } from "express-validator";
import { validatorHandler } from "../middleware/validatorHamdler";

const router = express.Router();

router.post("/", authenticate, createValidators, PropertyController.create);
router.patch("/:id", authenticate, updateValidators, PropertyController.update);
router.delete("/:id", authenticate, [param("id").isMongoId().withMessage("id invalide")], validatorHandler, PropertyController.delete);

export default router;

export {};
