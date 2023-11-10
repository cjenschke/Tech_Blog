const router = require('express').Router();
const postController = require('../controllers/postController');

// Define routes for handling posts
router.get('/post/:id', postController.showPost);

module.exports = router;
