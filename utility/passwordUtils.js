const bcrypt = require('bcryptjs');

// Define the number of salt rounds for hashing
const saltRounds = 10;

// Hash a password
const generateHash = async (password) => {
  try {
    // Generate a hashed password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    // Handle any errors during hashing
    throw err;
  }
};

// Check a password against a hashed password
const checkPassword = async (password, hashedPassword) => {
  try {
    // Compare the provided password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatch;
  } catch (err) {
    // Handle any errors during password comparison
    throw err;
  }
};

module.exports = { generateHash, checkPassword };
