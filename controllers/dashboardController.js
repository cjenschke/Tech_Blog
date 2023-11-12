const { Post } = require('../models');

const dashboardController = {
  async getDashboard(req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      const posts = await Post.findAll({ where: { userId } });
      res.render('dashboard', { posts });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).send('Error loading dashboard');
    }
  },
};

module.exports = dashboardController;
