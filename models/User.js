// Import the necessary dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Post = require('./Post');
const Comment = require('./Comment');
// const User = require('./User');

// Define the User model
class User extends Model {}

// Set up the fields and rules for the User model
User.init(
  {
    // Define the user model attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    sequelize, // Pass in the sequelize connection
    timestamps: false, // Disable timestamps for this model
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use underscores for field names
    modelName: 'user', // Set the model name to 'user'
  }
);

// Create associations with other models.
User.associate = (models) => {
  User.hasMany(models.Post, {
    foreignKey: 'user_id',
    as: 'posts', // This 'as' is important for eager loading
  });
  User.hasMany(models.Comment, {
    foreignKey: 'user_id',
    as: 'comments',
  });
};
// User.hasMany(Post, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE', // Define the behavior on user deletion
// });

// User.hasMany(Comment, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// Export the User model
module.exports = User;
