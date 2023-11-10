const router = require('express').Router();
const homeController = require('../controllers/homeController');

// Define routes for handling the home page
router.get('/', homeController.showHomePage);

module.exports = router;
