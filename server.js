const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config();

// Create the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Import your route files
const homeRoute = require('./routes/homeRoute');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

// Configure Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Added a default secret for safety
    resave: false,
    saveUninitialized: false,
  })
);

// Console log to check session details
app.use((req, res, next) => {
  console.log('Session Details:', req.session);
  next();
});

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', homeRoute);
app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
