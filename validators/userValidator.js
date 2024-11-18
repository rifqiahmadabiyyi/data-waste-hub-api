const Joi = require('joi');

/**
 * Validation schema for creating a new user
 */
exports.createUserSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'username cannot be empty',
    'any.required': 'username is required',
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]{8,30}$'))
    .required()
    .messages({
      'string.empty': 'password cannot be empty',
      'string.min': 'password must be at least 8 characters',
      'any.required': 'password is required',
      'string.pattern.base': 'password must include letters, numbers, or special characters',
    }),
  departement_id: Joi.number().integer().required().messages({
    'number.base': 'departement_id must be a number',
    'number.integer': 'departement_id must be an integer',
    'any.required': 'departement_id is required',
  }),
});

/**
 * Validation schema for updating an existing user
 */
exports.updateUserSchema = Joi.object({
  username: Joi.string().optional(),
  password: Joi.string().min(8)
  .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]{8,30}$'))
  .required()
  .messages({
    'string.empty': 'password cannot be empty',
    'string.min': 'password must be at least 8 characters',
    'any.required': 'password is required',
    'string.pattern.base': 'password must include letters, numbers, or special characters',
  }),
  departement_id: Joi.number().integer().required().messages({
    'number.base': 'departement_id must be a number',
    'number.integer': 'departement_id must be an integer',
    'any.required': 'departement_id is required',
  }),
});
