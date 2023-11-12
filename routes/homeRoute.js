const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Handle logic for the home page
  res.render('home');
});

module.exports = router;
