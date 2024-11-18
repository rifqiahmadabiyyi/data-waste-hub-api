/**
 * Middleware to validate request body against a Joi schema
 * @param {Joi.Schema} schema - Joi validation schema
 */
const validateRequest = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errorDetails = error.details.map((detail) => detail.message);
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          error_code: 1308,
          data: errorDetails,
        });
      }
      next();
    };
  };
  
  module.exports = validateRequest;