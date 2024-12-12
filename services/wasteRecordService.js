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
  const rawRecords = await WasteRecord.findAll({
    attributes: [
      'departement_id',
      'category_id',
      [Sequelize.fn('SUM', Sequelize.col('WasteRecord.weight_kg')), 'weight_kg']
    ],
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('WasteRecord.createdAt')), month),
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('WasteRecord.createdAt')), year)
      ]
    },
    include: [
      {
        model: Departement,
        as: 'departement',
        attributes: ['departement_name'],
      },
      {
        model: WasteCategory,
        as: 'category',
        attributes: ['category_name'],
      },
    ],
    group: ['departement_id', 'category_id', 'departement.id', 'category.id'],
  });

  const groupedData = {};

  rawRecords.forEach(record => {
    const departementId = record.departement_id;
    if (!groupedData[departementId]) {
      groupedData[departementId] = {
        departement_id: departementId,
        total_weight: 0,
        departement: record.departement,
        categories: []
      };
    }

    groupedData[departementId].total_weight += parseFloat(record.weight_kg);

    groupedData[departementId].categories.push({
      category_id: record.category_id,
      total_weight: parseFloat(record.weight_kg),
      category: record.category,
    });
  });

  return Object.values(groupedData);
};


// Get waste records per year, grouped by department
exports.getWasteRecordsByYear = async (year) => {
  const rawRecords = await WasteRecord.findAll({
    attributes: [
      'departement_id',
      'category_id',
      [Sequelize.fn('SUM', Sequelize.col('WasteRecord.weight_kg')), 'weight_kg']
    ],
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('WasteRecord.createdAt')), year)
      ]
    },
    include: [
      {
        model: Departement,
        as: 'departement',
        attributes: ['departement_name'],
      },
      {
        model: WasteCategory,
        as: 'category',
        attributes: ['category_name'],
      },
    ],
    group: ['departement_id', 'category_id', 'departement.id', 'category.id'],
  });

  const groupedData = {};

  rawRecords.forEach(record => {
    const departementId = record.departement_id;
    if (!groupedData[departementId]) {
      groupedData[departementId] = {
        departement_id: departementId,
        total_weight: 0,
        departement: record.departement,
        categories: []
      };
    }

    groupedData[departementId].total_weight += parseFloat(record.weight_kg);

    groupedData[departementId].categories.push({
      category_id: record.category_id,
      total_weight: parseFloat(record.weight_kg),
      category: record.category,
    });
  });

  return Object.values(groupedData);
};

exports.getWasteRecordsByDay = async (day, month, year) => {
  const rawRecords = await WasteRecord.findAll({
    attributes: [
      'departement_id',
      'category_id',
      [Sequelize.fn('SUM', Sequelize.col('WasteRecord.weight_kg')), 'weight_kg']
    ],
    where: {
      [Op.and]: [
        Sequelize.where(Sequelize.fn('DAY', Sequelize.col('WasteRecord.createdAt')), day),
        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('WasteRecord.createdAt')), month),
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('WasteRecord.createdAt')), year)
      ]
    },
    include: [
      {
        model: Departement,
        as: 'departement',
        attributes: ['departement_name'],
      },
      {
        model: WasteCategory,
        as: 'category',
        attributes: ['category_name'],
      },
    ],
    group: ['departement_id', 'category_id', 'departement.id', 'category.id'],
  });

  const groupedData = {};

  rawRecords.forEach(record => {
    const departementId = record.departement_id;
    if (!groupedData[departementId]) {
      groupedData[departementId] = {
        departement_id: departementId,
        total_weight: 0,
        departement: record.departement,
        categories: []
      };
    }

    groupedData[departementId].total_weight += parseFloat(record.weight_kg);

    groupedData[departementId].categories.push({
      category_id: record.category_id,
      total_weight: parseFloat(record.weight_kg),
      category: record.category,
    });
  });

  return Object.values(groupedData);
};

exports.getWasteRecordsPerMonthByDepartement = async (departementId, month, year) => {
  const rawRecords = await WasteRecord.findAll({
    attributes: [
      'departement_id',
      'category_id',
      [Sequelize.fn('SUM', Sequelize.col('WasteRecord.weight_kg')), 'weight_kg'],
    ],
    where: {
      [Op.and]: [
        { departement_id: departementId },
        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('WasteRecord.createdAt')), month),
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('WasteRecord.createdAt')), year),
      ],
    },
    include: [
      {
        model: Departement,
        as: 'departement',
        attributes: ['departement_name'],
      },
      {
        model: WasteCategory,
        as: 'category',
        attributes: ['category_name'],
      },
    ],
    group: ['departement_id', 'category_id', 'departement.id', 'category.id'],
  });

  const groupedData = {};

  rawRecords.forEach(record => {
    const departementId = record.departement_id;
    if (!groupedData[departementId]) {
      groupedData[departementId] = {
        departement_id: departementId,
        total_weight: 0,
        departement: record.departement,
        categories: []
      };
    }

    groupedData[departementId].total_weight += parseFloat(record.weight_kg);

    groupedData[departementId].categories.push({
      category_id: record.category_id,
      total_weight: parseFloat(record.weight_kg),
      category: record.category,
    });
  });

  return Object.values(groupedData);
};

exports.getWasteRecordsPerYearByDepartement = async (departementId, year) => {
  const rawRecords = await WasteRecord.findAll({
    attributes: [
      'departement_id',
      'category_id',
      [Sequelize.fn('SUM', Sequelize.col('WasteRecord.weight_kg')), 'weight_kg'],
    ],
    where: {
      [Op.and]: [
        { departement_id: departementId },
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('WasteRecord.createdAt')), year),
      ],
    },
    include: [
      {
        model: Departement,
        as: 'departement',
        attributes: ['departement_name'],
      },
      {
        model: WasteCategory,
        as: 'category',
        attributes: ['category_name'],
      },
    ],
    group: ['departement_id', 'category_id', 'departement.id', 'category.id'],
  });

  const groupedData = {};

  rawRecords.forEach(record => {
    const departementId = record.departement_id;
    if (!groupedData[departementId]) {
      groupedData[departementId] = {
        departement_id: departementId,
        total_weight: 0,
        departement: record.departement,
        categories: []
      };
    }

    groupedData[departementId].total_weight += parseFloat(record.weight_kg);

    groupedData[departementId].categories.push({
      category_id: record.category_id,
      total_weight: parseFloat(record.weight_kg),
      category: record.category,
    });
  });

  return Object.values(groupedData);
};

exports.getWasteRecordsPerDayByDepartement = async (departementId, day, month, year) => {
  const rawRecords = await WasteRecord.findAll({
    attributes: [
      'departement_id',
      'category_id',
      [Sequelize.fn('SUM', Sequelize.col('WasteRecord.weight_kg')), 'weight_kg'],
    ],
    where: {
      [Op.and]: [
        { departement_id: departementId },
        Sequelize.where(Sequelize.fn('DAY', Sequelize.col('WasteRecord.createdAt')), day),
        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('WasteRecord.createdAt')), month),
        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('WasteRecord.createdAt')), year)
      ],
    },
    include: [
      {
        model: Departement,
        as: 'departement',
        attributes: ['departement_name'],
      },
      {
        model: WasteCategory,
        as: 'category',
        attributes: ['category_name'],
      },
    ],
    group: ['departement_id', 'category_id', 'departement.id', 'category.id'],
  });

  const groupedData = {};

  rawRecords.forEach(record => {
    const departementId = record.departement_id;
    if (!groupedData[departementId]) {
      groupedData[departementId] = {
        departement_id: departementId,
        total_weight: 0,
        departement: record.departement,
        categories: []
      };
    }

    groupedData[departementId].total_weight += parseFloat(record.weight_kg);

    groupedData[departementId].categories.push({
      category_id: record.category_id,
      total_weight: parseFloat(record.weight_kg),
      category: record.category,
    });
  });

  return Object.values(groupedData);
};


exports.getWasteRecordsByDepartement = async (departementId) => {
  return await WasteRecord.findAll({
    where: {
      departement_id: departementId, // Filter berdasarkan departementId
    },
    include: {
      model: Departement,
      as: 'departement',
      attributes: ['departement_name', 'departement_description'],
    },
  });
};

exports.getWasteRecordsById = async (recordId) => {
  return await WasteRecord.findByPk(recordId, {
    include: {
      model: Departement,
      as: 'departement',
      attributes: ['departement_name', 'departement_description'],
    },
  });
};