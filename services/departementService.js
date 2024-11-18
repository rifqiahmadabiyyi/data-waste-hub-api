const { Departement } = require('../models');

/**
 * Get all users
 */
exports.getAllDepartements = async () => {
  return await Departement.findAll();
};

/**
 * Create a new category with departement validation
 */
exports.createDepartement = async (departementData) => {
  return await Departement.create(departementData);
};

/**
 * Get category by ID
 */
exports.getDepartementById = async (departementId) => {
  return await Departement.findByPk(departementId);
};

/**
 * Update category with departement validation
 */
exports.updateDepartement = async (departementId, departementData) => {
  const updated = await Departement.update(departementData, { where: { id: departementId } });
  return updated[0]; // Return number of rows updated
};

/**
 * Delete category
 */
exports.deleteDepartement = async (departementId) => {
  return await Departement.destroy({ where: { id: departementId } });
};
