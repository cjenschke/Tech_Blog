const Sequelize = require('sequelize');
const User = require('../models/User');

const sequelize = new Sequelize('techblog_db', 'root', 'U3hwdyi#', {
  host: 'localhost',
  dialect: 'mysql',
});

const seedUsers = async () => {
  try {
    // Fetch all existing users
    const users = await User.findAll();

    // Delete each user
    for (const user of users) {
      await user.destroy();
    }

    // Create new users
    await User.bulkCreate([
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' },
      { username: 'user3', email: 'user3@example.com', password: 'password3' },
    ]);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

seedUsers();
