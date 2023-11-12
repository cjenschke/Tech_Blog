const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Update with your database config

class User extends Model {}

User.init(
  {
    // Model attributes
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other attributes as needed
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;
