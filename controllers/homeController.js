const { Post, User, Comment } = require('../models');

const homeController = {
  showHomePage: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, attributes: ['text', 'user_id'] },
        ],
      });

      res.render('home', { posts });
    } catch (err) {
      console.error('Error in showHomePage:', err.message);
      console.error('Stack trace:', err.stack);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = homeController;
