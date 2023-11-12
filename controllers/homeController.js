const { Post } = require('../models');

const homeController = {
  async index(req, res) {
    try {
      const posts = await Post.findAll();
      res.render('home', { posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Error loading homepage');
    }
  },
};

module.exports = homeController;
