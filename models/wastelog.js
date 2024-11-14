'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WasteLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Relasi ke User (Many-to-One)
      WasteLog.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  WasteLog.init({
    user_id: DataTypes.INTEGER,
    action: DataTypes.STRING,
    waste_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WasteLog',
  });
  return WasteLog;
};