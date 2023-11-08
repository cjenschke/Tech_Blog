// Import the necessary dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post Model
class Post extends Model {}

// Set up the fields and rules for the Post model
Post.init(
  {
    // Define the post model attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
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
  },
  {
    sequelize, // Pass in the sequelize connection
    timestamps: true, // Enable timestamps for this model
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use underscores for field names
    modelName: 'post', // Set the model name to 'post'
  }
);

// Create associations with other models, if necessary
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

// Export the Post model
module.exports = Post;
