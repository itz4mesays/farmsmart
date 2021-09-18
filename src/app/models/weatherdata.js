'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeatherData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  WeatherData.init({
    lat: DataTypes.STRING,
    lon: DataTypes.STRING,
    doy: DataTypes.STRING,
    hour: DataTypes.STRING,
    elevation: DataTypes.STRING,
    Tair: DataTypes.STRING,
    Precipitation: DataTypes.STRING,
    WindSpeed: DataTypes.STRING,
    Rs: DataTypes.STRING,
    SPH: DataTypes.STRING,
    Potential_ET: DataTypes.STRING,
    etr: DataTypes.STRING,
    Downward_LW_Rad: DataTypes.STRING,
    Downward_SW_Rad: DataTypes.STRING,
    Geopotential_height_surface: DataTypes.STRING,
    Latent_heat_flux: DataTypes.STRING,
    Max_SPH: DataTypes.STRING,
    Max_temp: DataTypes.STRING,
    Min_SPH: DataTypes.STRING,
    Min_temp: DataTypes.STRING,
    Pressure_surface: DataTypes.STRING,
    Sensible_heat_flux: DataTypes.STRING,
    Specific_humidity: DataTypes.STRING,
    Temp_2m: DataTypes.STRING,
    Upward_LW_Rad: DataTypes.STRING,
    Upward_SW_Rad: DataTypes.STRING,
    SM_150_cm: DataTypes.STRING,
    SM_25_cm: DataTypes.STRING,
    SM_5_cm: DataTypes.STRING,
    SM_70_cm: DataTypes.STRING,
    Wind_U: DataTypes.STRING,
    Wind_V: DataTypes.STRING
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'WeatherData',
  });
  return WeatherData;
};