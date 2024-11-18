const { User, Departement } = require('../models');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

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
  const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
  const newUser = await User.create({ ...userData, password: hashedPassword });

  return await User.findByPk(newUser.id, {
    include: {
      model: Departement,
      as: 'departement',
      attributes: ['departement_name', 'departement_description'],
    },
  });
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
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
  }

  await User.update(userData, { where: { id: userId } });

  return await User.findByPk(userId, {
    include: {
      model: Departement,
      as: 'departement',
      attributes: ['departement_name', 'departement_description'],
    },
  });
  // const updated = await User.update(userData, { where: { id: userId } });
  // return updated[0]; // Return number of rows updated
};

/**
 * Delete user
 */
exports.deleteUser = async (userId) => {
  return await User.destroy({ where: { id: userId } });
};
