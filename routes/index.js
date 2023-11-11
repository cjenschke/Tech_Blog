const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoute');
const postRoutes = require('./postRoute');
const homeRoutes = require('./homeRoute');

// Define the root route
router.get('/', (req, res) => {
  // If you have a "home" view, you can render it directly
  res.render('home'); // This assumes you have a "home.handlebars" file in your views directory

  // Or if you want to redirect to the homeRoutes' main page
  // res.redirect('/home');
});

// Routes
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/home', homeRoutes);

module.exports = router;
