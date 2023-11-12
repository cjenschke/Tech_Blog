const express = require('express');
const router = express.Router();

const homeRoute = require('./homeRoute');
const postRoute = require('./postRoute');
const userRoute = require('./userRoute');

router.use('/', homeRoute);
router.use('/posts', postRoute);
router.use('/users', userRoute);

module.exports = router;
