const Sequelize = require('sequelize');
const User = require('../models/User');

const sequelize = new Sequelize(
  'your_database',
  'your_username',
  'your_password',
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

const seedUsers = async () => {
  try {
    // Delete existing users
    await User.destroy({ truncate: true });

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
