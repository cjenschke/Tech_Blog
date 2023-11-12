// Import the necessary dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Add any additional fields as needed
});

module.exports = Comment;
