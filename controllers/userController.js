const { User } = require('../models');
const bcrypt = require('bcrypt');

const userController = {
  showSignupForm: (req, res) => {
    res.render('signup');
  },

  signupUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res
          .status(400)
          .render('signup', { error: 'Email is already registered' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        res.redirect('/dashboard');
      });
    } catch (err) {
      console.error('Signup error:', err.message);
      console.error(err.stack); // Provides the stack trace
      res
        .status(500)
        .render('signup', { error: 'An error occurred during sign up.' });
    }
  },

  showLoginForm: (req, res) => {
    res.render('login');
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(400)
          .render('login', { error: 'Invalid email or password' });
      }
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        res.redirect('/dashboard');
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).render('login', { error: 'Internal Server Error' });
    }
  },

  showDashboard: (req, res) => {
    // Your existing code to display the dashboard
  },

  logoutUser: (req, res) => {
    // Your existing code to handle user logout
  },
};

module.exports = userController;
