// Import necessary dependencies
const { Post, User, Comment } = require('../db/models');

const homeController = {
  // Display the home page with a list of blog posts
  showHomePage: async (req, res) => {
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
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = homeController;
