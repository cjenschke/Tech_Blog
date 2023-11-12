const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');
const sequelize = require('../config/connection');

// Define associations between models if needed
// For example, if a Post has many Comments:
// Post.hasMany(Comment, { foreignKey: 'postId' });
// Comment.belongsTo(Post, { foreignKey: 'postId' });

// Sync all models with the database
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

module.exports = { Comment, Post, User };
