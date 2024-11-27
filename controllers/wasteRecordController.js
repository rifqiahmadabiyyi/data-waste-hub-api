const { successResponse, errorResponse } = require('../helpers/responseHelper');
const wasteRecordService = require('../services/wasteRecordService');
const { createWasteRecordSchema } = require('../validators/wasteRecordValidator');
const { Departement, WasteCategory  } = require('../models');
const validateRequest = require('../middlewares/validateRequest');
const multer = require('multer');

exports.createWasteRecord = [
    validateRequest(createWasteRecordSchema),
    async (req, res) => {
      try {
        // Validasi apakah file diunggah
        if (!req.file) {
          return errorResponse(res, 'No file uploaded or invalid file type', 1012, {}, 400);
        }
        
        const { departement_id, category_id, weight_kg } = req.body;

        const departement = await Departement.findByPk(departement_id);
        if (!departement) return errorResponse(res, 'Invalid departement_id', 4001, {}, 400);
        
        const category = await WasteCategory.findByPk(category_id);
        if (!category) return errorResponse(res, 'Invalid category_id', 4001, {}, 400);

        const newRecord = await wasteRecordService.createSingleRecord({
          departement_id,
          category_id,
          weight_kg,
          evidence_photo: req.file.filename,
        });
  
        return successResponse(res, 'Waste record created successfully', newRecord, 201);
      } catch (err) {
        if (err instanceof multer.MulterError) {
          return errorResponse(res, err.message, 1013, {}, 400);
        }
        return errorResponse(res, err.message, 1014, {}, 500);
      }
    }
  ];

  exports.getWasteRecordsByMonth = async (req, res) => {
    try {
      const { month, year } = req.params;
      const records = await wasteRecordService.getWasteRecordsByMonth(month, year);
      return successResponse(res, 'Waste records retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1015);
    }
  };
  
  // Get waste records per year
  exports.getWasteRecordsByYear = async (req, res) => {
    try {
      const { year } = req.params;
      const records = await wasteRecordService.getWasteRecordsByYear(year);
      return successResponse(res, 'Waste records retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1016);
    }
  };

  exports.getWasteRecordsByDay = async (req, res) => {
    try {
      const { day, month, year } = req.params;
      const records = await wasteRecordService.getWasteRecordsByDay(day, month, year);
      return successResponse(res, 'Waste records retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1015);
    }
  }