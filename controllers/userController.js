const { join } = require('path');
const { User } = require('../db/models');
const { checkPassword, generateHash } = require('../utility/passwordUtils');

const userController = {
  // Display the registration form
  showRegistrationForm: (req, res) => {
    res.render('signup');
  },

  // Handle user registration
  registerUser: async (req, res) => {
    try {
      // Extract user data from the request body
      const { username, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      // Hash the user's password before saving it
      const hashedPassword = await generateHash(password);

      // Create a new user in the database
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // Set up the user's session
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.status(201).json({ message: 'User registered successfully' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Display the login form
  showLoginForm: (req, res) => {
    res.render('login');
  },

  // Handle user login
  loginUser: async (req, res) => {
    try {
      // Extract user data from the request body
      const { email, password } = req.body;

      // Check if the email is registered
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if the password is correct
      const validPassword = await checkPassword(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Set up the user's session
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res.status(200).json({ message: 'User logged in successfully' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Display the user dashboard
  showDashboard: (req, res) => {
    if (!req.session.logged_in) {
      return res.redirect('/login');
    }

    // Fetch additional user data later

    res.render('dashboard', {
      logged_in: req.session.logged_in,
      // Add additional data later
    });
  },

  // Handle user logout
  logoutUser: (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.redirect('/');
      });
    } else {
      res.redirect('/login');
    }
  },
};

module.exports = userController;
