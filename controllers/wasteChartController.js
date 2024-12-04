const { successResponse, errorResponse } = require('../helpers/responseHelper');
const wasteChartService = require('../services/wasteChartService');
const { Departement  } = require('../models');

exports.getWasteRecordsByMonth = async (req, res) => {
    try {
      const { month, year, type } = req.params;
      const records = await wasteChartService.getWasteRecordsByMonth(month, year, type);
      return successResponse(res, 'Waste charts retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1015);
    }
  };
  
  // Get waste records per year
  exports.getWasteRecordsByYear = async (req, res) => {
    try {
      const { year, type } = req.params;
      const records = await wasteChartService.getWasteRecordsByYear(year, type);
      return successResponse(res, 'Waste charts retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1016);
    }
  };

  exports.getWasteRecordsByDay = async (req, res) => {
    try {
      const { day, month, year, type } = req.params;
      const records = await wasteChartService.getWasteRecordsByDay(day, month, year, type);
      return successResponse(res, 'Waste charts retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1015);
    }
  }

  exports.getWasteRecordsByDepartementPerMonth = async (req, res) => {
    try {
      const { departement_id, month, year, type } = req.params;

      const departement = await Departement.findByPk(departement_id);
      if (!departement) return errorResponse(res, 'Invalid departement_id', 4001, {}, 400);

      const records = await wasteChartService.getWasteRecordsByDepartementPerMonth(departement_id, month, year, type);
      return successResponse(res, 'Waste charts retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1015);
    }
  };
  
  // Get waste records per year
  exports.getWasteRecordsByDepartementPerYear = async (req, res) => {
    try {
      const { departement_id, year, type } = req.params;

      const departement = await Departement.findByPk(departement_id);
      if (!departement) return errorResponse(res, 'Invalid departement_id', 4001, {}, 400);

      const records = await wasteChartService.getWasteRecordsByDepartementPerYear(departement_id, year, type);
      return successResponse(res, 'Waste charts retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1016);
    }
  };

  exports.getWasteRecordsByDepartementPerDay = async (req, res) => {
    try {
      const { departement_id, day, month, year, type } = req.params;

      const departement = await Departement.findByPk(departement_id);
      if (!departement) return errorResponse(res, 'Invalid departement_id', 4001, {}, 400);

      const records = await wasteChartService.getWasteRecordsByDepartementPerDay(departement_id, day, month, year, type);
      return successResponse(res, 'Waste charts retrieved successfully', records);
    } catch (err) {
      return errorResponse(res, err.message, 1015);
    }
  }