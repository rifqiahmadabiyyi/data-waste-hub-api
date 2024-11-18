const wasteCategoryService = require('../services/wasteCategoryService');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { createCategorySchema, updateCategorySchema } = require('../validators/wasteCategoryValidator');
const validateRequest = require('../middlewares/validateRequest');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await wasteCategoryService.getAllCategories();
    return successResponse(res, 'Waste Categories retrieved successfully', categories);
  } catch (err) {
    return errorResponse(res, err.message, 1001);
  }
};

exports.createCategory = [
    validateRequest(createCategorySchema),
    async (req, res) => {
      try {
        const { category_name, category_description } = req.body;
        const newCategory = await wasteCategoryService.createCategory({ category_name, category_description });
        return successResponse(res, 'Category created successfully', newCategory, 201);
      } catch (err) {
        return errorResponse(res, err.message, 1002, {}, 400);
      }
    },
  ];

exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await wasteCategoryService.getCategoryById(categoryId);
    if (!category) {
      return errorResponse(res, 'Category not found', 1003, {}, 404);
    }
    return successResponse(res, 'Category retrieved successfully', category);
  } catch (err) {
    return errorResponse(res, err.message, 1004);
  }
};

exports.updateCategory = [
    validateRequest(updateCategorySchema),
    async (req, res) => {
      try {
        const categoryId = req.params.id;
        const updated = await wasteCategoryService.updateCategory(categoryId, req.body);
        if (updated === 0) {
          return errorResponse(res, 'Category not found', 1005, {}, 404);
        }
        const updatedCategory = await wasteCategoryService.getCategoryById(categoryId);
        return successResponse(res, 'Category updated successfully', updatedCategory);
      } catch (err) {
        return errorResponse(res, err.message, 1006, {}, 400);
      }
    },
  ];

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deleted = await wasteCategoryService.deleteCategory(categoryId);
    if (!deleted) {
      return errorResponse(res, 'Category not found', 1007, {}, 404);
    }
    return successResponse(res, 'Category deleted successfully');
  } catch (err) {
    return errorResponse(res, err.message, 1008);
  }
};
