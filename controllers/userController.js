const { join } = require('path');
const { User } = require('../models');
const { checkPassword, generateHash } = require('../utility/passwordUtils');

const userController = {
  // Display the registration form
  showRegistrationForm: (req, res) => {
    res.render('signup');
  },

  // Handle user registration
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ error: 'Email is already registered' });
        return;
      }

      const hashedPassword = await generateHash(password);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.redirect('/dashboard'); // Redirect to the dashboard after signup
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Display the login form
  showLoginForm: (req, res) => {
    res.render('login');
  },

  // Handle user login
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(400).json({ error: 'Invalid email or password' });
        return;
      }

      const validPassword = await checkPassword(password, user.password);
      if (!validPassword) {
        res.status(400).json({ error: 'Invalid email or password' });
        return;
      }

      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res.redirect('/dashboard'); // Redirect to the dashboard after login
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Display the user dashboard
  showDashboard: (req, res) => {
    if (!req.session.logged_in) {
      res.redirect('/login');
      return;
    }

    res.render('dashboard', {
      logged_in: req.session.logged_in,
    });
  },

  // Handle user logout
  logoutUser: (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.redirect('/'); // Redirect to the homepage after logout
      });
    } else {
      res.redirect('/login');
    }
  },
};

module.exports = userController;
