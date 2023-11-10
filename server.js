require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const homeRoutes = require('./routes/homeRoute');

const app = express();
const PORT = process.env.PORT || 3001;

console.log(sequelize);
// ... Other middleware and configurations ...

// Set up session middleware
const sess = {
  secret: 'supersecretsecret',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Routes
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/home', homeRoutes);

// ... Start the server ...
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
