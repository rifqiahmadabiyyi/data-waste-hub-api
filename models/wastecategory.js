'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WasteCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      // Relasi ke WasteRecord (One-to-Many)
      WasteCategory.hasMany(models.WasteRecord, { foreignKey: 'category_id', as: 'waste_records' });
    }
  }
  WasteCategory.init({
    category_name: DataTypes.STRING,
    category_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WasteCategory',
  });
  return WasteCategory;
};