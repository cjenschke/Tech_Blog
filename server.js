require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User, Post, Comment } = require('./models');
const userRoutes = require('./routes/userRoute');
const postRoutes = require('./routes/postRoute');
const homeRoutes = require('./routes/homeRoute');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up session middleware
const sess = {
  secret: 'Super secret secret',
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

// Serve static files (CSS, JS, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
console.log('Handlebars configuration:', exphbs);

// Define a simple route
app.get('/', async (req, res) => {
  console.log('Accessing the root route');
  const posts = await Post.findAll({
    include: [
      { model: User, attributes: ['username'] },
      { model: Comment, attributes: ['text', 'user_id'] },
    ],
  });
  console.log('Posts:', posts);
  res.render('home', { posts });
});

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  // Start the server after syncing models
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
