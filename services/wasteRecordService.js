const { WasteRecord, Departement, WasteCategory  } = require('../models');
const { Op, Sequelize } = require('sequelize');

/**
 * Create a single waste record
 * @param {Object} recordData
 */
exports.createSingleRecord = async (recordData) => {
  const newRecord = await WasteRecord.create(recordData);

  return await WasteRecord.findByPk(newRecord.id, {
    include: [
      {
        model: Departement,
        as: 'departement',
        attributes: ['departement_name', 'departement_description'],
      },
      {
        model: WasteCategory,
        as: 'category',
        attributes: ['category_name', 'category_description'],
      }
    ],
  });
};

// Get waste records per month and year, grouped by department
exports.getWasteRecordsByMonth = async (month, year) => {
  return await WasteRecord.findAll({
    attributes: [
      'departement_id',
      [Sequelize.fn('SUM', Sequelize.col('WasteRecord.weight_kg')), 'total_weight']
    ],
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('WasteRecord.createdAt')), month),
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('WasteRecord.createdAt')), year)
      ]
    },
    include: {
      model: Departement,
      as: 'departement',
      attributes: ['departement_name'],
    },
    group: ['departement_id', 'departement.id'],
  });
};

// Get waste records per year, grouped by department
exports.getWasteRecordsByYear = async (year) => {
  return await WasteRecord.findAll({
    attributes: [
      'departement_id',
      [Sequelize.fn('SUM', Sequelize.col('WasteRecord.weight_kg')), 'total_weight']
    ],
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('WasteRecord.createdAt')), year)
      ]
    },
    include: {
      model: Departement,
      as: 'departement',
      attributes: ['departement_name'],
    },
    group: ['departement_id', 'departement.id'],
  });
};