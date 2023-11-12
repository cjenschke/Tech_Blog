const User = require('../models/User');

const authController = {
  getSignupForm: (req, res) => {
    // Render the signup form view
    res.render('signup');
  },
  signup: async (req, res) => {
    try {
      // Extract user data from req.body
      const { username, email, password } = req.body;

      // Create a new user
      const user = await User.create({ username, email, password });

      // Redirect to the appropriate page (e.g., dashboard)
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).send('Error signing up');
    }
  },
  getLoginForm: (req, res) => {
    // Render the login form view
    res.render('login');
  },

  login: async (req, res) => {
    try {
      // Extract login credentials from req.body
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ where: { email } });

      // Check if the user exists and the password is correct
      if (user && user.isCorrectPassword(password)) {
        // Set the user ID in the session
        req.session.userId = user.id;

        // Redirect to the appropriate page (e.g., dashboard)
        res.redirect('/dashboard');
      } else {
        // Redirect to the login page with an error message
        res.redirect('/login?error=invalid_credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Error logging in');
    }
  },

  logout: (req, res) => {
    try {
      // Destroy the session
      req.session.destroy();

      // Redirect to the appropriate page (e.g., home)
      res.redirect('/');
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).send('Error logging out');
    }
  },
};

module.exports = authController;
