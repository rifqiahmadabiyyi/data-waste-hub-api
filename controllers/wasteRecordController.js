const { successResponse, errorResponse } = require('../helpers/responseHelper');
const wasteRecordService = require('../services/wasteRecordService');
const { createWasteRecordSchema } = require('../validators/wasteRecordValidator');
const { createMultipleWasteRecordsSchema  } = require('../validators/wasteRecordValidator');
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

  exports.createMultipleWasteRecords = [
    validateRequest(createMultipleWasteRecordsSchema),
    async (req, res) => {
      try {
        const parsedRecords = JSON.parse(req.body.records);
    
        // Validasi apakah file diunggah
        const files = req.files.evidence_photos || []; // Ambil file, jika ada
        const createdRecords = []; // Menyimpan records yang berhasil dibuat
    
        for (let i = 0; i < parsedRecords.length; i++) {
          const record = parsedRecords[i];
    
          // Validasi departement_id
          const departement = await Departement.findByPk(record.departement_id);
          if (!departement) {
            return errorResponse(
              res,
              `Invalid departement_id for record at index ${i}`,
              4001,
              { index: i },
              400
            );
          }
    
          // Validasi category_id
          const category = await WasteCategory.findByPk(record.category_id);
          if (!category) {
            return errorResponse(
              res,
              `Invalid category_id for record at index ${i}`,
              4002,
              { index: i },
              400
            );
          }
    
          // Cek apakah ada file yang diunggah untuk record ini berdasarkan index
          const file = files[i] || null; // Jika tidak ada file, set ke null
    
          // Buat record baru, gunakan null jika file tidak ada
          const newRecord = await wasteRecordService.createSingleRecord({
            departement_id: record.departement_id,
            category_id: record.category_id,
            weight_kg: record.weight_kg,
            evidence_photo: file ? file.filename : null, // Jika file ada, gunakan namanya, jika tidak, set ke null
          });
    
          createdRecords.push(newRecord);
        }
    
        return successResponse(res, 'Waste records created successfully', createdRecords, 201);
      } catch (err) {
        if (err instanceof multer.MulterError) {
          return errorResponse(res, err.message, 1013, {}, 400);
        }
        return errorResponse(res, err.message, 1014, {}, 500);
      }
    },
  ];

  // Records by Departement
  exports.getWasteRecordsPerMonthByDepartement = async (req, res) => {
    try {
      const { departement_id, month, year } = req.params;
      const records = await wasteRecordService.getWasteRecordsPerMonthByDepartement(departement_id, month, year);
      return successResponse(res, 'Waste records retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1016);
    }
  };

  exports.getWasteRecordsPerYearByDepartement = async (req, res) => {
    try {
      const { departement_id, year } = req.params;
      const records = await wasteRecordService.getWasteRecordsPerYearByDepartement(departement_id, year);
      return successResponse(res, 'Waste records retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1016);
    }
  };

  exports.getWasteRecordsPerDayByDepartement = async (req, res) => {
    try {
      const { departement_id, day, month, year } = req.params;
      const records = await wasteRecordService.getWasteRecordsPerDayByDepartement(departement_id, day, month, year);
      return successResponse(res, 'Waste records retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1015);
    }
  }
  
  
  
  