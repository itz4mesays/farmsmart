'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Weather_Annnuals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      weather_station_id: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lon: {
        type: Sequelize.FLOAT
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
        type: Sequelize.FLOAT
      },
      Precipitation: {
        type: Sequelize.FLOAT
      },
      WindSpeed: {
        type: Sequelize.FLOAT
      },
      Rs: {
        type: Sequelize.FLOAT
      },
      SPH: {
        type: Sequelize.FLOAT
      },
      etr: {
        type: Sequelize.FLOAT
      },
      Potential_Evaporation: {
        type: Sequelize.FLOAT
      },
      SM_25_cm: {
        type: Sequelize.FLOAT
      },
      Downward_SW_Rad: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Weather_Annnuals');
  }
};