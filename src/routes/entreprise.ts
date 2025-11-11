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

/**
 * @swagger
 * tags:
 *   name: Entreprises
 *   description: Enterprise management endpoints
 */

/**
 * @swagger
 * /api/entreprises:
 *   get:
 *     summary: Get all entreprises
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of entreprises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entreprise'
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, EntrepriseController.getEntreprises);

/**
 * @swagger
 * /api/entreprises/{id}:
 *   get:
 *     summary: Get entreprise by ID
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entreprise details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entreprise'
 *       404:
 *         description: Entreprise not found
 */
router.get("/:id", authenticate, EntrepriseController.getEntreprise);

/**
 * @swagger
 * /api/entreprises:
 *   post:
 *     summary: Create a new entreprise
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entreprise'
 *     responses:
 *       201:
 *         description: Entreprise created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, createValidators, EntrepriseController.create);

/**
 * @swagger
 * /api/entreprises/{id}:
 *   patch:
 *     summary: Update an entreprise
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entreprise'
 *     responses:
 *       200:
 *         description: Entreprise updated successfully
 *       404:
 *         description: Entreprise not found
 */
router.patch("/:id", authenticate, updateValidators, EntrepriseController.update);

/**
 * @swagger
 * /api/entreprises/{id}:
 *   delete:
 *     summary: Delete an entreprise
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Entreprise deleted successfully
 *       404:
 *         description: Entreprise not found
 */
router.delete("/:id", authenticate, EntrepriseController.remove);

/**
 * @swagger
 * /api/entreprises/{id}/employees:
 *   get:
 *     summary: Get all employees of an entreprise
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/:id/employees", authenticate, EntrepriseController.getEmployees);

/**
 * @swagger
 * /api/entreprises/{id}/employees/{employeeId}:
 *   get:
 *     summary: Get specific employee
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/:id/employees/:employeeId", authenticate, EntrepriseController.getEmployee);

/**
 * @swagger
 * /api/entreprises/{id}/employees:
 *   post:
 *     summary: Add employee to entreprise
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Employee added successfully
 *       404:
 *         description: Entreprise not found
 */
router.post("/:id/employees", authenticate, addEmployeeValidators, EntrepriseController.addEmployee);

/**
 * @swagger
 * /api/entreprises/{id}/employees/{employeeId}:
 *   patch:
 *     summary: Update employee
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee or entreprise not found
 */
router.patch("/:id/employees/:employeeId", authenticate, updateEmployeeValidators, EntrepriseController.updateEmployee);

/**
 * @swagger
 * /api/entreprises/{id}/employees/{employeeId}:
 *   delete:
 *     summary: Remove employee
 *     tags: [Entreprises]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee removed successfully
 *       404:
 *         description: Employee or entreprise not found
 */
router.delete("/:id/employees/:employeeId", authenticate, EntrepriseController.removeEmployee);

	

export default router;
