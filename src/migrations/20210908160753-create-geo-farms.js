'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GeoFarms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id' 
        },
      },
      geolocation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shape: {
        allowNull: false,
        type: Sequelize.STRING
      },
      area: {
        allowNull: false,
        type: Sequelize.STRING
      },
      crop_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      variety: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sowing_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      soil_type: {
        allowNull: false, 
        type: Sequelize.STRING
      },
      village_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      district: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      country: {
        allowNull: false,
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
    await queryInterface.dropTable('GeoFarms');
  }
};