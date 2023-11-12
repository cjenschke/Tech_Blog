const sequelize = require('./config/connection');
const { User, Post, Comment } = require('./models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  try {
    // Create users
    const users = await User.bulkCreate([
      { username: 'user1', email: 'user1@example.com' },
      { username: 'user2', email: 'user2@example.com' },
      // Add more user data as needed
    ]);

    // Create posts
    const posts = await Post.bulkCreate([
      { title: 'Post 1', content: 'Content for post 1', UserId: users[0].id },
      { title: 'Post 2', content: 'Content for post 2', UserId: users[1].id },
      // Add more post data as needed
    ]);

    // Create comments
    await Comment.bulkCreate([
      { content: 'Comment 1', UserId: users[0].id, PostId: posts[0].id },
      { content: 'Comment 2', UserId: users[1].id, PostId: posts[1].id },
      // Add more comment data as needed
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }

  process.exit(0);
};

seedDatabase();
