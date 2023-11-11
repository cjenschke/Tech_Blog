const sequelize = require('../config/connection'); // Adjust the path accordingly

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
}

// Run the test connection function
testConnection();
