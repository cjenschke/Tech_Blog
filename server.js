const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Ensure models are imported correctly
const { Post, User, Comment } = require('./models');
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
app.use('/public', express.static(path.join(__dirname, 'public')));

// Set up Handlebars as the view engine with added options to allow prototype access
const hbs = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    // Your helpers here if you have any
  },
  extname: '.handlebars',
  // Add runtime options to disable the strict check
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Define a simple route
app.get('/', async (req, res) => {
  console.log('Accessing the root route');

  try {
    // Fetch all blog posts with associated user and comment data
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: { model: User, attributes: ['username'] } },
      ],
    });

    // Convert the Sequelize model instances to plain objects
    const postsPlain = posts.map((post) => post.get({ plain: true }));

    // Render the home page view with the blog posts
    res.render('home', { posts: postsPlain });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Use the routes defined in the separate file
const userRoutes = require('./routes/userRoute');
app.use(userRoutes);

app.use(routes);

// Sync Sequelize models with the database and start the server
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
})();
