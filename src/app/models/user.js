'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.hasOne(models.Customer, {
        foreignKey: 'user_id'
      })

      User.hasMany(models.GeoFarms, {
        foreignKey: {
          allowNull: false,
          name: 'user_id'
        }
      })
      
    }
  };
  User.init({
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    user_category: {
      allowNull: false,
      type: DataTypes.STRING
    },
    auth_key: {
      allowNull: true,
      type: DataTypes.STRING
    },
    status: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'User',
  });
  return User;
};