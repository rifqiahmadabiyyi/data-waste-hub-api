const Joi = require('joi');

exports.createWasteRecordSchema = Joi.object({
  departement_id: Joi.number().required().messages({
    'number.base': 'departement_id must be a number',
    'any.required': 'departement_id is required',
  }),
  category_id: Joi.number().required().messages({
    'number.base': 'category_id must be a number',
    'any.required': 'category_id is required',
  }),
  weight_kg: Joi.number().required().messages({
    'number.base': 'weight_kg must be float',
    'any.required': 'weight_kg is required',
  }),
});