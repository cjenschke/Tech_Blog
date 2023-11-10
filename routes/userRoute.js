const router = require('express').Router();
// Import the user model
const { User } = require('../models');
const userController = require('../controllers/userController');
const { checkPassword } = require('../utility/passwordUtils');

// Middleware to check if the user is logged in
const withAuth = async (req, res, next) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Route for displaying the registration form
router.get('/signup', userController.showRegistrationForm);

// Route for handling user registration
router.post('/signup', userController.registerUser);

// Route for displaying login form
router.get('/login', userController.showLoginForm);

// Route for handling user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is registered
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct using passwordUtils
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
});

// Route for displaying the user dashboard (protected route)
router.get('/dashboard', withAuth, userController.showDashboard);

// Route for handling user logout
router.get('/logout', userController.logoutUser);

module.exports = router;
