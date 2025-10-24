import express from "express";
import EntrepriseController from "../controllers/entrepriseController";
import { authenticate } from "../middleware/auth";

const router = express.Router();


router.post("/", authenticate, EntrepriseController.createValidators, EntrepriseController.create);
router.patch("/:id", authenticate, EntrepriseController.updateValidators, EntrepriseController.update);
router.delete("/:id", authenticate, EntrepriseController.remove);
router.post("/:id/employees", authenticate, EntrepriseController.addEmployeeValidators, EntrepriseController.addEmployee);
router.patch("/:id/employees/:employeeId", authenticate, EntrepriseController.updateEmployeeValidators, EntrepriseController.updateEmployee);
	

export default router;
