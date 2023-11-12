const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Handle logic for the home page
  res.send('Home Page');
});

router.get('/about', (req, res) => {
  // Handle logic for the about page
  res.send('About Page');
});

module.exports = router;
