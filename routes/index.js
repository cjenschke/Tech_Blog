const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoute');
const postRoutes = require('./postRoute');
const homeRoutes = require('./homeRoute');

// Routes
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/home', homeRoutes);

module.exports = router;
