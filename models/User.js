const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Update with your database config

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // other attributes...
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;
