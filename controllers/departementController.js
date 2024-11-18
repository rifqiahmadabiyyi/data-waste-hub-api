const departementService = require('../services/departementService');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { createDepartementSchema, updateDepartementSchema } = require('../validators/departementValidator');
const validateRequest = require('../middlewares/validateRequest');

exports.getAllDepartements = async (req, res) => {
  try {
    const departements = await departementService.getAllDepartements();
    return successResponse(res, 'Departements retrieved successfully', departements);
  } catch (err) {
    return errorResponse(res, err.message, 1001);
  }
};

exports.createDepartement = [
    validateRequest(createDepartementSchema),
    async (req, res) => {
      try {
        const { departement_name, departement_description } = req.body;
        const newDepartement = await departementService.createDepartement({ departement_name, departement_description });
        return successResponse(res, 'Departement created successfully', newDepartement, 201);
      } catch (err) {
        return errorResponse(res, err.message, 1002, {}, 400);
      }
    },
  ];

exports.getDepartementById = async (req, res) => {
  try {
    const departementId = req.params.id;
    const departement = await departementService.getDepartementById(departementId);
    if (!departement) {
      return errorResponse(res, 'Departement not found', 1003, {}, 404);
    }
    return successResponse(res, 'Departement retrieved successfully', departement);
  } catch (err) {
    return errorResponse(res, err.message, 1004);
  }
};

exports.updateDepartement = [
    validateRequest(updateDepartementSchema),
    async (req, res) => {
      try {
        const departementId = req.params.id;
        const updated = await departementService.updateDepartement(departementId, req.body);
        if (updated === 0) {
          return errorResponse(res, 'Departement not found', 1005, {}, 404);
        }
        const updatedDepartement = await departementService.getDepartementById(departementId);
        return successResponse(res, 'Departement updated successfully', updatedDepartement);
      } catch (err) {
        return errorResponse(res, err.message, 1006, {}, 400);
      }
    },
  ];

exports.deleteDepartement = async (req, res) => {
  try {
    const departementId = req.params.id;
    const deleted = await departementService.deleteDepartement(departementId);
    if (!deleted) {
      return errorResponse(res, 'Departement not found', 1007, {}, 404);
    }
    return successResponse(res, 'Departement deleted successfully');
  } catch (err) {
    return errorResponse(res, err.message, 1008);
  }
};
