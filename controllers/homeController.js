const { Post, User, Comment } = require('../models');

const homeController = {
  showHomePage: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [
          { model: User, attributes: ['username'] },
          {
            model: Comment,
            include: { model: User, attributes: ['username'] },
          },
        ],
      });

      // Convert the Sequelize response into a plain object
      const postsPlain = posts.map((post) => post.get({ plain: true }));

      res.render('home', {
        posts: postsPlain,
        loggedIn: req.session.loggedIn, // Pass loggedIn status to the view
      });
    } catch (err) {
      console.error('Error in showHomePage:', err.message);
      res.status(500).send(err.message);
    }
  },
};

module.exports = homeController;
