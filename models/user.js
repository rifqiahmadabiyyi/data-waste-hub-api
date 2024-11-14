'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Relasi ke Departement (Many-to-One)
      User.belongsTo(models.Departement, { foreignKey: 'departement_id', as: 'departement' });

      // Relasi ke WasteLog (One-to-Many)
      User.hasMany(models.WasteLog, { foreignKey: 'user_id', as: 'waste_logs' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    departement_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};