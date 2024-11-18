const Joi = require('joi');

/**
 * Validation schema for creating a new Departement
 */
exports.createDepartementSchema = Joi.object({
  departement_name: Joi.string().required().messages({
    'string.empty': 'departement_name cannot be empty',
    'any.required': 'departement_name is required',
  }),
  departement_description: Joi.string().required().messages({
    'string.empty': 'departement_description cannot be empty',
    'any.required': 'departement_description is required',
  }),
//   departement_description: Joi.string().allow('').optional(),
});

/**
 * Validation schema for updating an existing Departement
 */
exports.updateDepartementSchema = Joi.object({
  departement_name: Joi.string().optional(),
  departement_description: Joi.string().allow('').optional(),
});