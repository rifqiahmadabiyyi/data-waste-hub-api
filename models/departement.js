'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Departement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Relasi ke User (One-to-Many)
      Departement.hasMany(models.User, { foreignKey: 'departement_id', as: 'users' });

      // Relasi ke WasteRecord (One-to-Many)
      Departement.hasMany(models.WasteRecord, { foreignKey: 'departement_id', as: 'waste_records' });
    }
  }
  Departement.init({
    departement_name: DataTypes.STRING,
    departement_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Departement',
  });
  return Departement;
};