/**
 * Helper function to send success response
 * @param {Object} res - Express response object
 * @param {String} message - Success message
 * @param {Object} data - Response data
 * @param {Number} [statusCode=200] - HTTP status code
 */
exports.successResponse = (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  
  /**
   * Helper function to send error response
   * @param {Object} res - Express response object
   * @param {String} message - Error message
   * @param {Number} errorCode - Custom error code
   * @param {Object} [data={}] - Additional data (if any)
   * @param {Number} [statusCode=500] - HTTP status code
   */
  exports.errorResponse = (res, message, errorCode, data = {}, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message,
      error_code: errorCode,
      data,
    });
  };
  