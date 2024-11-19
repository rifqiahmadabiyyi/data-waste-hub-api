const Joi = require('joi');

/**
 * Validation schema for Register
 */
exports.registerSchema = Joi.object({
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
  departement_id: Joi.number().required().messages({
    'number.base': 'departement_id must be a number',
    'any.required': 'departement_id is required',
  }),
//   departement_description: Joi.string().allow('').optional(),
});

/**
 * Validation schema for Login
 */
exports.loginSchema = Joi.object({
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
});