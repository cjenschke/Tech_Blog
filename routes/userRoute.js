const router = require('express').Router();
const userController = require('../controllers/userController');

// Middleware to check if the user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

// Route for displaying the signup form
router.get('/signup', userController.showSignupForm);

// Route for handling user signup
router.post('/signup', userController.signupUser);

// Route for displaying the login form
router.get('/login', userController.showLoginForm);

// Route for handling user login
router.post('/login', userController.loginUser);

// Route for displaying the user dashboard (protected route)
router.get('/dashboard', withAuth, userController.showDashboard);

// Route for handling user logout
router.get('/logout', userController.logoutUser);

module.exports = router;
