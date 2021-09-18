'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WeatherData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lat: {
        type: Sequelize.STRING
      },
      lon: {
        type: Sequelize.STRING
      },
      doy: {
        type: Sequelize.STRING
      },
      hour: {
        type: Sequelize.STRING
      },
      elevation: {
        type: Sequelize.STRING
      },
      Tair: {
        type: Sequelize.STRING
      },
      Precipitation: {
        type: Sequelize.STRING
      },
      WindSpeed: {
        type: Sequelize.STRING
      },
      Rs: {
        type: Sequelize.STRING
      },
      SPH: {
        type: Sequelize.STRING
      },
      Potential_ET: {
        type: Sequelize.STRING
      },
      etr: {
        type: Sequelize.STRING
      },
      Downward_LW_Rad: {
        type: Sequelize.STRING
      },
      Downward_SW_Rad: {
        type: Sequelize.STRING
      },
      Geopotential_height_surface: {
        type: Sequelize.STRING
      },
      Latent_heat_flux: {
        type: Sequelize.STRING
      },
      Max_SPH: {
        type: Sequelize.STRING
      },
      Max_temp: {
        type: Sequelize.STRING
      },
      Min_SPH: {
        type: Sequelize.STRING
      },
      Min_temp: {
        type: Sequelize.STRING
      },
      Pressure_surface: {
        type: Sequelize.STRING
      },
      Sensible_heat_flux: {
        type: Sequelize.STRING
      },
      Specific_humidity: {
        type: Sequelize.STRING
      },
      Temp_2m: {
        type: Sequelize.STRING
      },
      Upward_LW_Rad: {
        type: Sequelize.STRING
      },
      Upward_SW_Rad: {
        type: Sequelize.STRING
      },
      SM_150_cm: {
        type: Sequelize.STRING
      },
      SM_25_cm: {
        type: Sequelize.STRING
      },
      SM_5_cm: {
        type: Sequelize.STRING
      },
      SM_70_cm: {
        type: Sequelize.STRING
      },
      Wind_U: {
        type: Sequelize.STRING
      },
      Wind_V: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WeatherData');
  }
};