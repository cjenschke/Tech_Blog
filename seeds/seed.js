// Import necessary dependencies
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// Data for seeding
const userData = [
  { username: 'user1', email: 'user1@example.com', password: 'password1' },
  { username: 'user2', email: 'user2@example.com', password: 'password2' },
  // Add more users as needed
];

const postData = [
  { title: 'Post 1', content: 'Content for post 1' },
  { title: 'Post 2', content: 'Content for post 2' },
  // Add more posts as needed
];

const commentData = [
  { text: 'Comment 1' },
  { text: 'Comment 2' },
  // Add more comments as needed
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Sync all models
    await sequelize.sync({ force: true });

    // Seed users
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Seed posts
    const posts = await Post.bulkCreate(postData);

    // Seed comments
    const comments = await Comment.bulkCreate(commentData);

    // Set up associations
    await Comment.bulkCreate([
      { text: 'Comment 1', user_id: users[0].id, post_id: posts[0].id },
      { text: 'Comment 2', user_id: users[1].id, post_id: posts[1].id },
      // Add more comments as needed
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// Call the seed function
seedDatabase();
