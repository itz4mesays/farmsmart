'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MarketPrice.init({
    market_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commodity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    variety: {
      type: DataTypes.STRING,
      allowNull: false
    },
    datetimes: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'MarketPrice',
  });
  return MarketPrice;
};