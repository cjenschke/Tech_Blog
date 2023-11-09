// Import the necessary dependencies
const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comment model
class Comment extends Model {}

// Set up the fields and rules for the Comment model
Comment.init(
  {
    // Define the comment model attributes
    id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: Datatypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize, // Pass in the sequelize connection
    timestamps: true, // Enable timestamps for this model
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use underscores for the field names
    modelName: 'comment', // Set the model name to 'comment'
  }
);

// Export the Comment model
module.exports = Comment;
