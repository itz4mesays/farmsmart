'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GeoFarms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      GeoFarms.belongsTo(models.User, {
        foreignKey: {
          allowNull:false,
          name: 'user_id'
        }
      })
    }
  };
  GeoFarms.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    geolocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shape: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    crop_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    variety: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sowing_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    soil_type: {
      type: DataTypes.STRING,
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
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'GeoFarms',
  });
  return GeoFarms;
};