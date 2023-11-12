const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  // Add any additional fields as needed
});

// Hash password before saving a new user
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Method to check if an unhashed password entered by the user can be compared to the hashed password in the database
User.prototype.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

(async () => {
  try {
    await User.sync(); // Create the table if it doesn't exist
    console.log('User table synced successfully');
  } catch (error) {
    console.error('Error syncing User table:', error);
  }
})();

module.exports = User;
