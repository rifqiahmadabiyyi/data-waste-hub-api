const express = require('express');
const wasteChartController = require('../../controllers/wasteChartController');
const { authenticateToken } = require('../../middlewares/auth');
const { authorizeRole } = require('../../middlewares/role');

const router = express.Router();

/**
 * @swagger
 * /waste-charts/year/{year}/type/{type}:
 *   get:
 *     summary: Retrieve waste charts by year and type
 *     tags: [Waste Charts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2024
 *         description: The year for which to retrieve waste charts
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           example: "bar"
 *         description: The type of chart
 *     responses:
 *       200:
 *         description: Waste charts retrieved successfully
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
 *                   example: "Waste charts retrieved successfully"
 *                 data:
 *                   type: string
 *                   example: "http://127.0.0.1:8000/visualize-bar-chart/?year=2024"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/year/:year/type/:type', authenticateToken, authorizeRole(['admin', 'user']), wasteChartController.getWasteRecordsByYear);

/**
 * @swagger
 * /waste-charts/month/{month}/year/{year}/type/{type}:
 *   get:
 *     summary: Retrieve waste charts by year and type
 *     tags: [Waste Charts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month (1-12)
 *         example: 10
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2024
 *         description: The year for which to retrieve waste charts
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           example: "bar"
 *         description: The type of chart
 *     responses:
 *       200:
 *         description: Waste charts retrieved successfully
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
 *                   example: "Waste charts retrieved successfully"
 *                 data:
 *                   type: string
 *                   example: "http://127.0.0.1:8000/visualize-bar-chart/?year=2024"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/month/:month/year/:year/type/:type', authenticateToken, authorizeRole(['admin', 'user']), wasteChartController.getWasteRecordsByMonth);

/**
 * @swagger
 * /waste-charts/day/{day}/month/{month}/year/{year}/type/{type}:
 *   get:
 *     summary: Retrieve waste charts by year and type
 *     tags: [Waste Charts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 31
 *         description: Day (1-31)
 *         example: 24
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         description: Month (1-12)
 *         example: 10
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2024
 *         description: The year for which to retrieve waste charts
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           example: "bar"
 *         description: The type of chart
 *     responses:
 *       200:
 *         description: Waste charts retrieved successfully
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
 *                   example: "Waste charts retrieved successfully"
 *                 data:
 *                   type: string
 *                   example: "http://127.0.0.1:8000/visualize-bar-chart/?year=2024"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/day/:day/month/:month/year/:year/type/:type', authenticateToken, authorizeRole(['admin', 'user']), wasteChartController.getWasteRecordsByDay);

module.exports = router;