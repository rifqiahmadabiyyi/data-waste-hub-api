const express = require('express');
const wasteRecordController = require('../../controllers/wasteRecordController');
const upload = require('../../middlewares/upload');
const { authenticateToken } = require('../../middlewares/auth');
const { authorizeRole } = require('../../middlewares/role');

const router = express.Router();

/**
 * @swagger
 * /waste-records:
 *   post:
 *     summary: Create a new waste record
 *     tags: [Waste Records]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               departement_id:
 *                 type: integer
 *                 description: ID of the department submitting the waste record
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 description: ID of the waste category
 *                 example: 2
 *               weight_kg:
 *                 type: number
 *                 description: Weight of the waste in kilograms
 *                 format: float
 *                 example: 12.5
 *               evidence_photo:
 *                 type: string
 *                 format: binary
 *                 description: Evidence photo of the waste record
 *     responses:
 *       201:
 *         description: Waste record created successfully
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
 *                   example: "Waste record created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 14
 *                     departement_id:
 *                       type: integer
 *                       example: 2
 *                     category_id:
 *                       type: integer
 *                       example: 2
 *                     weight_kg:
 *                       type: number
 *                       format: float
 *                       example: 12.5
 *                     evidence_photo:
 *                       type: string
 *                       example: "1731997871728-664110813.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-19T06:31:11.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-19T06:31:11.000Z"
 *                     departement:
 *                       type: object
 *                       properties:
 *                         departement_name:
 *                           type: string
 *                           example: "Back Office"
 *                         departement_description:
 *                           type: string
 *                           example: "Handles internal operations."
 *                     category:
 *                       type: object
 *                       properties:
 *                         category_name:
 *                           type: string
 *                           example: "Limbah Pabrik"
 *                         category_description:
 *                           type: string
 *                           example: "Limbah test"
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticateToken, authorizeRole(['admin', 'user']), upload.single('evidence_photo'), wasteRecordController.createWasteRecord);

/**
 * @swagger
 * /waste-records/bulk:
 *   post:
 *     summary: Create a new waste record (bulk)
 *     tags: [Waste Records]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               records:
 *                 type: array
 *                 description: Multiple Records of waste records
 *                 example: [{ "departement_id": 1, "category_id": 2, "weight_kg": 15.5 }, { "departement_id": 1, "category_id": 4, "weight_kg": 20.0 }]
 *               evidence_photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Evidence photos of the waste record by index
 *     responses:
 *       201:
 *         description: Waste records created successfully
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
 *                   example: "Waste records created successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 54
 *                       departement_id:
 *                         type: integer
 *                         example: 1
 *                       category_id:
 *                         type: integer
 *                         example: 4
 *                       weight_kg:
 *                         type: number
 *                         format: float
 *                         example: 20.0
 *                       evidence_photo:
 *                         type: string
 *                         example: "1732734319474-188711958.jpg"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-27T19:05:19.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-27T19:05:19.000Z"
 *                       departement:
 *                         type: object
 *                         properties:
 *                           departement_name:
 *                             type: string
 *                             example: "Front Office"
 *                           departement_description:
 *                             type: string
 *                             example: "Front Office"
 *                       category:
 *                         type: object
 *                         properties:
 *                           category_name:
 *                             type: string
 *                             example: "Plastic"
 *                           category_description:
 *                             type: string
 *                             example: "Recyclable plastic waste."
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 */
router.post('/bulk', authenticateToken, authorizeRole(['admin', 'user']), upload.fields([{ name: 'evidence_photos', maxCount: 10 }]), wasteRecordController.createMultipleWasteRecords);

/**
 * @swagger
 * /waste-records/month/{month}/year/{year}:
 *   get:
 *     summary: Retrieve waste records summary by month and year
 *     tags: [Waste Records]
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
 *           minimum: 2000
 *         description: Year (e.g., 2024)
 *         example: 2024
 *     responses:
 *       200:
 *         description: Waste records retrieved successfully
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
 *                   example: Waste records retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       departement_id:
 *                         type: integer
 *                         description: ID of the department
 *                         example: 1
 *                       total_weight:
 *                         type: number
 *                         description: Total weight of waste (kg)
 *                         format: float
 *                         example: 62.5
 *                       departement:
 *                         type: object
 *                         properties:
 *                           departement_name:
 *                             type: string
 *                             description: Name of the department
 *                             example: "Front Office"
 *                       categories:
 *                         type: array
 *                         description: List of waste categories
 *                         items:
 *                           type: object
 *                           properties:
 *                             category_id:
 *                               type: integer
 *                               description: ID of the waste category
 *                               example: 2
 *                             total_weight:
 *                               type: number
 *                               description: Total weight of this category (kg)
 *                               format: float
 *                               example: 12.5
 *                             category:
 *                               type: object
 *                               description: Details of the waste category
 *                               properties:
 *                                 category_name:
 *                                   type: string
 *                                   description: Name of the category
 *                                   example: "Limbah Pabrik"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No records found
 */
router.get('/month/:month/year/:year', authenticateToken, authorizeRole(['admin', 'user']), wasteRecordController.getWasteRecordsByMonth);

/**
 * @swagger
 * /waste-records/year/{year}:
 *   get:
 *     summary: Retrieve waste records by year
 *     tags: [Waste Records]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Year (e.g., 2024)
 *         example: 2024
 *     responses:
 *       200:
 *         description: Waste records for the specified year
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
 *                   example: Waste records retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       departement_id:
 *                         type: integer
 *                         description: ID of the department
 *                         example: 1
 *                       total_weight:
 *                         type: number
 *                         description: Total weight of waste (kg)
 *                         format: float
 *                         example: 62.5
 *                       departement:
 *                         type: object
 *                         properties:
 *                           departement_name:
 *                             type: string
 *                             description: Name of the department
 *                             example: "Front Office"
 *                       categories:
 *                         type: array
 *                         description: List of waste categories
 *                         items:
 *                           type: object
 *                           properties:
 *                             category_id:
 *                               type: integer
 *                               description: ID of the waste category
 *                               example: 2
 *                             total_weight:
 *                               type: number
 *                               description: Total weight of this category (kg)
 *                               format: float
 *                               example: 12.5
 *                             category:
 *                               type: object
 *                               description: Details of the waste category
 *                               properties:
 *                                 category_name:
 *                                   type: string
 *                                   description: Name of the category
 *                                   example: "Limbah Pabrik"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No records found
 */
router.get('/year/:year', authenticateToken, authorizeRole(['admin', 'user']), wasteRecordController.getWasteRecordsByYear);

/**
 * @swagger
 * /waste-records/day/{day}/month/{month}/year/{year}:
 *   get:
 *     summary: Retrieve waste records summary by day month and year
 *     tags: [Waste Records]
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
 *           minimum: 2000
 *         description: Year (e.g., 2024)
 *         example: 2024
 *     responses:
 *       200:
 *         description: Waste records retrieved successfully
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
 *                   example: Waste records retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       departement_id:
 *                         type: integer
 *                         description: ID of the department
 *                         example: 1
 *                       total_weight:
 *                         type: number
 *                         description: Total weight of waste (kg)
 *                         format: float
 *                         example: 62.5
 *                       departement:
 *                         type: object
 *                         properties:
 *                           departement_name:
 *                             type: string
 *                             description: Name of the department
 *                             example: "Front Office"
 *                       categories:
 *                         type: array
 *                         description: List of waste categories
 *                         items:
 *                           type: object
 *                           properties:
 *                             category_id:
 *                               type: integer
 *                               description: ID of the waste category
 *                               example: 2
 *                             total_weight:
 *                               type: number
 *                               description: Total weight of this category (kg)
 *                               format: float
 *                               example: 12.5
 *                             category:
 *                               type: object
 *                               description: Details of the waste category
 *                               properties:
 *                                 category_name:
 *                                   type: string
 *                                   description: Name of the category
 *                                   example: "Limbah Pabrik"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No records found
 */
router.get('/day/:day/month/:month/year/:year', authenticateToken, authorizeRole(['admin', 'user']), wasteRecordController.getWasteRecordsByDay);

module.exports = router;