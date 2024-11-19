const express = require('express');
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../../controllers/userController');
const { authenticateToken } = require('../../middlewares/auth');
const { authorizeRole } = require('../../middlewares/role');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
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
 *                   username:
 *                     type: string
 *                     example: john_doe
 *                   departement_id:
 *                     type: integer
 *                     example: 3
 *                   role:
 *                     type: string
 *                     example: user
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticateToken, authorizeRole(['admin', 'user']), getAllUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the new user
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 description: Password for the new user
 *                 example: securepassword
 *               departement_id:
 *                 type: integer
 *                 description: ID of the user's department
 *                 example: 3
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: john_doe
 *                 departement_id:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, authorizeRole(['admin']), createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: john_doe
 *                 departement_id:
 *                   type: integer
 *                   example: 3
 *                 role:
 *                   type: string
 *                   example: user
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', authenticateToken, authorizeRole(['admin', 'user']), getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Updated username of the user
 *                 example: jane_doe
 *               password:
 *                 type: string
 *                 description: Updated password for the user
 *                 example: newsecurepassword
 *               departement_id:
 *                 type: integer
 *                 description: Updated department ID of the user
 *                 example: 5
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: jane_doe
 *                 departement_id:
 *                   type: integer
 *                   example: 5
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', authenticateToken, authorizeRole(['admin']), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', authenticateToken, authorizeRole(['admin']), deleteUser);

module.exports = router;
