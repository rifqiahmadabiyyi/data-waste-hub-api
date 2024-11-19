const express = require('express');
const {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../../controllers/wasteCategoryController');
const { authenticateToken } = require('../../middlewares/auth');
const { authorizeRole } = require('../../middlewares/role');

const router = express.Router();

/**
 * @swagger
 * /waste-categories:
 *   get:
 *     summary: Retrieve all waste categories
 *     tags: [Waste Categories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of waste categories
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
 *                   category_name:
 *                     type: string
 *                     example: Plastic
 *                   category_description:
 *                     type: string
 *                     example: Recyclable plastic waste.
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, authorizeRole(['admin', 'user']), getAllCategories);

/**
 * @swagger
 * /waste-categories:
 *   post:
 *     summary: Create a new waste category
 *     tags: [Waste Categories]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: Name of the waste category
 *                 example: Plastic
 *               category_description:
 *                 type: string
 *                 description: Description of the waste category
 *                 example: Recyclable plastic waste.
 *     responses:
 *       201:
 *         description: Waste Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 category_name:
 *                   type: string
 *                   example: Plastic
 *                 category_description:
 *                   type: string
 *                   example: Recyclable plastic waste.
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, authorizeRole(['admin']), createCategory);

/**
 * @swagger
 * /waste-categories/{id}:
 *   get:
 *     summary: Get a waste category by ID
 *     tags: [Waste Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the waste category
 *     responses:
 *       200:
 *         description: Waste Category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 category_name:
 *                   type: string
 *                   example: Plastic
 *                 category_description:
 *                   type: string
 *                   example: Recyclable plastic waste.
 *       404:
 *         description: Waste Category not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticateToken, authorizeRole(['admin', 'user']), getCategoryById);

/**
 * @swagger
 * /waste-categories/{id}:
 *   put:
 *     summary: Update a waste category by ID
 *     tags: [Waste Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the waste category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: Updated name of the waste category
 *                 example: Metal
 *               category_description:
 *                 type: string
 *                 description: Updated description of the waste category
 *                 example: Recyclable metal waste.
 *     responses:
 *       200:
 *         description: Waste Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 category_name:
 *                   type: string
 *                   example: Metal
 *                 category_description:
 *                   type: string
 *                   example: Recyclable metal waste.
 *       404:
 *         description: Category not found
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateCategory);

/**
 * @swagger
 * /waste-categories/{id}:
 *   delete:
 *     summary: Delete a waste category by ID
 *     tags: [Waste Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the waste category to delete
 *     responses:
 *       200:
 *         description: Waste Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Waste Category deleted successfully
 *       404:
 *         description: Waste Category not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteCategory);

module.exports = router;