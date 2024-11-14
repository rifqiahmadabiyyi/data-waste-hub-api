'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WasteRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Relasi ke Departement (Many-to-One)
      WasteRecord.belongsTo(models.Departement, { foreignKey: 'departement_id', as: 'departement' });

      // Relasi ke WasteCategory (Many-to-One)
      WasteRecord.belongsTo(models.WasteCategory, { foreignKey: 'category_id', as: 'category' });
    }
  }
  WasteRecord.init({
    departement_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    weight_kg: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'WasteRecord',
  });
  return WasteRecord;
};