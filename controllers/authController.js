const { User } = require('../models');
const bcrypt = require('bcrypt');

const authController = {
  getLoginPage(req, res) {
    res.render('login');
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.userId = user.id;
        res.redirect('/dashboard');
      } else {
        res.redirect('/login?error=Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).send('Error during login');
    }
  },

  getSignupPage(req, res) {
    res.render('signup');
  },

  signup: async (req, res) => {
    try {
      console.log(req.body); // Log the received data
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log({ username, email, password: hashedPassword });
      await User.create({ username, email, password: hashedPassword });
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).send('Error during signup');
    }
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  },
};

module.exports = authController;
