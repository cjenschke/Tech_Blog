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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up routes
app.use('/', homeRoute);
app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
