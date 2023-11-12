const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup route
router.get('/signup', authController.getSignupForm);
router.post('/signup', authController.signup);

// Login route
router.get('/login', authController.getLoginForm);
router.post('/auth/login', authController.login);

// Dashboard route
router.get('/dashboard', authController.getDashboard);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;
