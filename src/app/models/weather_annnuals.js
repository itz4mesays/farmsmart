'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weather_Annnuals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Weather_Annnuals.init({
    weather_station_id: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT,
    doy: DataTypes.STRING,
    hour: DataTypes.STRING,
    elevation: DataTypes.STRING,
    Tair: DataTypes.FLOAT,
    Precipitation: DataTypes.FLOAT,
    WindSpeed: DataTypes.FLOAT,
    Rs: DataTypes.FLOAT,
    SPH: DataTypes.FLOAT,
    etr: DataTypes.FLOAT,
    Potential_Evaporation: DataTypes.FLOAT,
    SM_25_cm: DataTypes.FLOAT,
    Downward_SW_Rad: DataTypes.FLOAT
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Weather_Annnuals',
  });
  return Weather_Annnuals;
};