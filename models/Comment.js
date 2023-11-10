// Import the necessary dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');

// Define the Comment model
class Comment extends Model {}

// Set up the fields and rules for the Comment model
Comment.init(
  {
    // Define the comment model attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
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

// Define associations between models
// Comment.belongsTo(User, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// Comment.belongsTo(Post, {
//   foreignKey: 'post_id',
//   onDelete: 'CASCADE',
// });

// Export the Comment model
module.exports = Comment;
