const express = require('express');
const session = require('express-session');
const path = require('path');
exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User, Post, Comment } = require('./models');
const routes = require('./routes');

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
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Define a simple route
app.get('/', async (req, res) => {
  console.log('Accessing the root route');

  try {
    // Fetch all blog posts with associated user and comment data
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, attributes: ['text', 'user_id'] },
      ],
    });

    // Render the home page view with the blog posts
    res.render('home', { posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Use the routes defined in the separate file
app.use(routes);

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  // Start the server after syncing models
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
