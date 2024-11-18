const { WasteCategory } = require('../models');

/**
 * Get all users
 */
exports.getAllCategories = async () => {
  return await WasteCategory.findAll();
};

/**
 * Create a new category with departement validation
 */
exports.createCategory = async (categoryData) => {
  return await WasteCategory.create(categoryData);
};

/**
 * Get category by ID
 */
exports.getCategoryById = async (categoryId) => {
  return await WasteCategory.findByPk(categoryId);
};

/**
 * Update category with departement validation
 */
exports.updateCategory = async (categoryId, categoryData) => {
  const updated = await WasteCategory.update(categoryData, { where: { id: categoryId } });
  return updated[0]; // Return number of rows updated
};

/**
 * Delete category
 */
exports.deleteCategory = async (categoryId) => {
  return await WasteCategory.destroy({ where: { id: categoryId } });
};
