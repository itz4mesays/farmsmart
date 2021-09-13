'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MarketPrice', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      market_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      district_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      commodity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      variety: {
        allowNull: false,
        type: Sequelize.STRING
      },
      datetimes: {
        allowNull: false,
        type: Sequelize.DATE
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
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
    await queryInterface.dropTable('MarketPrice');
  }
};