const express = require('express');
const wasteRecordController = require('../../controllers/wasteRecordController');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.post('/', upload.single('evidence_photo'), wasteRecordController.createWasteRecord);

router.get('/month/:month/year/:year', wasteRecordController.getWasteRecordsByMonth);

// Get waste records by year
router.get('/year/:year', wasteRecordController.getWasteRecordsByYear);

module.exports = router;