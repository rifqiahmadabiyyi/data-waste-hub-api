const { successResponse, errorResponse } = require('../helpers/responseHelper');
const wasteChartService = require('../services/wasteChartService');

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