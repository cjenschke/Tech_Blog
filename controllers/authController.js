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

      // Check if user was successfully created
      if (!user) {
        throw new Error('Failed to create user');
      }

      // Redirect to the dashboard route
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
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user && (await user.isCorrectPassword(password))) {
        req.session.userId = user.id;
        res.redirect('/dashboard');
      } else {
        res.redirect('/login?error=invalid_credentials');
      }
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).send('Login error');
    }
  },

  logout: (req, res) => {
    try {
      // Destroy the session
      req.session.destroy();

      // Redirect to the home page
      res.redirect('/');
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).send('Error logging out');
    }
  },

  getDashboard: (req, res) => {
    console.log('Session on Dashboard:', req.session);
    // Render the dashboard view
    res.render('dashboard');
  },
};

module.exports = authController;
