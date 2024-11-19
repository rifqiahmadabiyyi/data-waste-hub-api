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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    departement_id: DataTypes.INTEGER,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    }
  });
  return User;
};