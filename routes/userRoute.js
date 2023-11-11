const router = require('express').Router();
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
router.post('/login', userController.loginUser); // Changed to use controller's loginUser method

// Route for displaying the user dashboard (protected route)
router.get('/dashboard', withAuth, userController.showDashboard);

// Route for handling user logout
router.get('/logout', userController.logoutUser); // Changed to use controller's logoutUser method

module.exports = router;
