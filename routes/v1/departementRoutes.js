const express = require('express');
const {
  getAllDepartements,
  createDepartement,
  getDepartementById,
  updateDepartement,
  deleteDepartement
} = require('../../controllers/departementController');
const { authenticateToken } = require('../../middlewares/auth');
const { authorizeRole } = require('../../middlewares/role');

const router = express.Router();

/**
 * @swagger
 * /departements:
 *   get:
 *     summary: Retrieve all departements
 *     tags: [Departements]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of departements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   departement_name:
 *                     type: string
 *                     example: Front Office
 *                   departement_description:
 *                     type: string
 *                     example: Handles front desk operations.
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, authorizeRole(['admin', 'user']), getAllDepartements);

/**
 * @swagger
 * /departements:
 *   post:
 *     summary: Create a new departement
 *     tags: [Departements]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departement_name:
 *                 type: string
 *                 description: Name of the departement
 *                 example: Front Office
 *               departement_description:
 *                 type: string
 *                 description: Description of the departement
 *                 example: Handles front desk operations.
 *     responses:
 *       201:
 *         description: Departement created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, authorizeRole(['admin']), createDepartement);

/**
 * @swagger
 * /departements/{id}:
 *   get:
 *     summary: Get a departement by ID
 *     tags: [Departements]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Departement ID
 *     responses:
 *       200:
 *         description: Departement details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 departement_name:
 *                   type: string
 *                   example: Front Office
 *                 departement_description:
 *                   type: string
 *                   example: Handles front desk operations.
 *       404:
 *         description: Departement not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticateToken, authorizeRole(['admin', 'user']), getDepartementById);

/**
 * @swagger
 * /departements/{id}:
 *   put:
 *     summary: Update a departement by ID
 *     tags: [Departements]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Departement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departement_name:
 *                 type: string
 *                 description: Updated name of the departement
 *                 example: Back Office
 *               departement_description:
 *                 type: string
 *                 description: Updated description of the departement
 *                 example: Handles internal operations.
 *     responses:
 *       200:
 *         description: Departement updated successfully
 *       404:
 *         description: Departement not found
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateDepartement);

/**
 * @swagger
 * /departements/{id}:
 *   delete:
 *     summary: Delete a departement by ID
 *     tags: [Departements]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Departement ID
 *     responses:
 *       200:
 *         description: Departement deleted successfully
 *       404:
 *         description: Departement not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteDepartement);

module.exports = router;