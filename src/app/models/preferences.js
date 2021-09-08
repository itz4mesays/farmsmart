'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Preferences.belongsTo(models.User, {
        foreignKey: {
          allowNull:false,
          name: 'user_id'
        }
      })
    }
  };
  Preferences.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    village_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    closest_market: {
      type: DataTypes.STRING,
      allowNull: false
    },
    crop_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Preferences',
  });
  return Preferences;
};