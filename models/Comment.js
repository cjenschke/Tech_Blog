// Import the necessary dependencies
const { Model, DataTypes, Sequelize } = require('sequelize');
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
        model: 'user',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    sequelize, // Pass in the sequelize connection
    modelName: 'comment', // Set the model name to 'comment'
  }
);

// Define associations between models
Comment.associate = (models) => {
  Comment.belongsTo(models.User, {
    foreignKey: 'user_Id',
    as: 'user',
  });
};

// Comment.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: 'user',
//   onDelete: 'CASCADE',
// });

// Comment.belongsTo(Post, {
//   foreignKey: 'post_id',
//   as: 'post',
//   onDelete: 'CASCADE',
// });

// Export the Comment model
module.exports = Comment;
