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
      const { email } = req.body;

      // Simplified check: Just find the user by email without password verification
      const user = await User.findOne({ where: { email } });

      if (user) {
        req.session.userId = user.id;
        console.log('User found, session set, redirecting to dashboard');
        res.redirect('/dashboard');
      } else {
        console.log('User not found, redirecting to login');
        res.redirect('/login?error=user_not_found');
      }
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).send('Login error');
    }
  },

  // login: async (req, res) => {
  //   try {
  //     // Extract login credentials from req.body
  //     const { email, password } = req.body;

  //     // Find the user by email
  //     const user = await User.findOne({ where: { email } });

  //     // Check if the user exists and the password is correct
  //     if (user && (await user.isCorrectPassword(password))) {
  //       // Set the user ID in the session
  //       req.session.userId = user.id;

  //       console.log('Redirecting to dashboard');
  //       // Redirect to the dashboard
  //       res.redirect('/dashboard');
  //     } else {
  //       console.log('Invalid credentials, redirecting to login');
  //       // Redirect to the login page with an error message
  //       res.redirect('/login?error=invalid_credentials');
  //     }
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     res.status(500).send('Error logging in');
  //   }
  // },

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
