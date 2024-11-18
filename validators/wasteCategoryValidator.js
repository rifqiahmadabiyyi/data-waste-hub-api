const Joi = require('joi');

/**
 * Validation schema for creating a new waste category
 */
exports.createCategorySchema = Joi.object({
  category_name: Joi.string().required().messages({
    'string.empty': 'category_name cannot be empty',
    'any.required': 'category_name is required',
  }),
  category_description: Joi.string().required().messages({
    'string.empty': 'category_description cannot be empty',
    'any.required': 'category_description is required',
  }),
//   category_description: Joi.string().allow('').optional(),
});

/**
 * Validation schema for updating an existing waste category
 */
exports.updateCategorySchema = Joi.object({
  category_name: Joi.string().optional(),
  category_description: Joi.string().allow('').optional(),
});