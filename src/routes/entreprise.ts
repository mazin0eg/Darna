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

router.get("/", authenticate, EntrepriseController.getEntreprises);
router.get("/:id", authenticate, EntrepriseController.getEntreprise);
router.post("/", authenticate, createValidators, EntrepriseController.create);
router.patch("/:id", authenticate, updateValidators, EntrepriseController.update);
router.delete("/:id", authenticate, EntrepriseController.remove);

router.get("/:id/employees", authenticate, EntrepriseController.getEmployees);
router.get("/:id/employees/:employeeId", authenticate, EntrepriseController.getEmployee);
router.post("/:id/employees", authenticate, addEmployeeValidators, EntrepriseController.addEmployee);
router.patch("/:id/employees/:employeeId", authenticate, updateEmployeeValidators, EntrepriseController.updateEmployee);
router.delete("/:id/employees/:employeeId", authenticate, EntrepriseController.removeEmployee);

	

export default router;
