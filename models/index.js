const sequelize = require('../config/connection'); // Ensure this path is correct
const Sequelize = require('sequelize');

const User = require('./User');
const Post = require('./Post'); // Assuming you have a Post model
const Comment = require('./Comment'); // Assuming you have a Comment model

// Initialize models
User.init(
  {
    // Define attributes as in your User model
  },
  { sequelize, modelName: 'User' }
);

Post.init(
  {
    // Define attributes as in your Post model
  },
  { sequelize, modelName: 'Post' }
);

Comment.init(
  {
    // Define attributes as in your Comment model
  },
  { sequelize, modelName: 'Comment' }
);

// Associations
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Post, Comment };
