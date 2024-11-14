const { User, Departement } = require('../models');

/**
 * Get all users
 */
exports.getAllUsers = async () => {
  return await User.findAll({
    include: {
      model: Departement,
      as: 'departement',
      attributes: ['departement_name', 'departement_description'],
    },
  });
};

/**
 * Create a new user with departement validation
 */
exports.createUser = async (userData) => {
  const { departement_id } = userData;

  // Check if departement exists
  const departement = await Departement.findByPk(departement_id);
  if (!departement) throw new Error('Invalid departement_id');

  return await User.create(userData);
};

/**
 * Get user by ID
 */
exports.getUserById = async (userId) => {
  return await User.findByPk(userId, {
    include: {
      model: Departement,
      as: 'departement',
      attributes: ['departement_name', 'departement_description'],
    },
  });
};

/**
 * Update user with departement validation
 */
exports.updateUser = async (userId, userData) => {
  const { departement_id } = userData;

  // Check if departement exists (only if departement_id is being updated)
  if (departement_id) {
    const departement = await Departement.findByPk(departement_id);
    if (!departement) throw new Error('Invalid departement_id');
  }

  const updated = await User.update(userData, { where: { id: userId } });
  return updated[0]; // Return number of rows updated
};

/**
 * Delete user
 */
exports.deleteUser = async (userId) => {
  return await User.destroy({ where: { id: userId } });
};
