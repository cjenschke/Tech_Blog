const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Setup associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'posts',
});
Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comments',
});
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'comments',
});
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post',
});

// Export the models
module.exports = {
  User,
  Post,
  Comment,
};
