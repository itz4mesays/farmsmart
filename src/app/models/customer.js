'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Customer.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          name: 'user_id'
        }
      })
    }
  };
  Customer.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'Customer',
  });
  return Customer;
};