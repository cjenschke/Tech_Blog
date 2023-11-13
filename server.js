const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Require routes
const homeRoute = require('./routes/homeRoute');
const authRoute = require('./routes/authRoute');
const dashboardRoute = require('./routes/dashboardRoute');

const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Express session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Database
const db = require('./models');

// Routes
app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

// Sync database and start the server
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
