import express from "express";
import EntrepriseController from "../controllers/entrepriseController";
import { authenticate } from "../middleware/auth";
import {
  createValidators,
  updateValidators,
  addEmployeeValidators,
  updateEmployeeValidators,
} from "../validator/entrepriseValidator";
const router = express.Router();


router.post("/", authenticate, createValidators, EntrepriseController.create);
router.patch("/:id", authenticate, updateValidators, EntrepriseController.update);
router.delete("/:id", authenticate, EntrepriseController.remove);
router.post("/:id/employees", authenticate, addEmployeeValidators, EntrepriseController.addEmployee);
router.patch("/:id/employees/:employeeId", authenticate, updateEmployeeValidators, EntrepriseController.updateEmployee);
router.delete("/:id/employees/:employeeId", authenticate, EntrepriseController.removeEmployee);
	

export default router;
