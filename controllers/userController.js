const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../helpers/responseHelper');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return successResponse(res, 'Users retrieved successfully', users);
  } catch (err) {
    return errorResponse(res, err.message, 1001);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, departement_id } = req.body;
    const newUser = await userService.createUser({ username, password, departement_id });
    return successResponse(res, 'User created successfully', newUser, 201);
  } catch (err) {
    return errorResponse(res, err.message, 1002, {}, 400);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      return errorResponse(res, 'User not found', 1003, {}, 404);
    }
    return successResponse(res, 'User retrieved successfully', user);
  } catch (err) {
    return errorResponse(res, err.message, 1004);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updated = await userService.updateUser(userId, req.body);
    if (updated === 0) {
      return errorResponse(res, 'User not found', 1005, {}, 404);
    }
    return successResponse(res, 'User updated successfully');
  } catch (err) {
    return errorResponse(res, err.message, 1006, {}, 400);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await userService.deleteUser(userId);
    if (!deleted) {
      return errorResponse(res, 'User not found', 1007, {}, 404);
    }
    return successResponse(res, 'User deleted successfully');
  } catch (err) {
    return errorResponse(res, err.message, 1008);
  }
};
