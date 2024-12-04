const express = require('express');
const router = express.Router();
const { register, login } = require('../../controllers/authController');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *                 example: johndoe
 *               departement_id:
 *                 type: number
 *                 description: The user's departement
 *                 example: 1
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user's ID
 *                   example: 1
 *                 username:
 *                   type: string
 *                   description: The user's username
 *                   example: johndoe
 *                 departement_id:
 *                   type: string
 *                   description: The user's departement
 *                   example: 1
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/auth/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and obtain a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Kineb
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMzMyMzQ0MSwiZXhwIjoxNzMzMzMwNjQxfQ.hDhPV9tZ1_naJyZnESCVqSWMyWELZn3Ki4DXSi3ho3g"
 *                     username:
 *                       type: string
 *                       example: Kineb
 *                     departement_id:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid credentials
 */
router.post('/auth/login', login);

module.exports = router;