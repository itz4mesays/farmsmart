'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AccessToken.belongsTo(models.User, {
        foreignKey: {
          allowNull:false,
          name: 'user_id'
        }
      })
    }
  };
  AccessToken.init({
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    access_token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'AccessToken',
  });
  return AccessToken;
};