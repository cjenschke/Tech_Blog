// Import necessary dependencies
const { Post, User, Comment } = require('../models');

const postController = {
  // Display a single blog post with comments
  showPost: async (req, res) => {
    try {
      // Fetch the requested blog post with associated user and comment data
      const post = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, attributes: ['text', 'user_id'] },
        ],
      });
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Render the post view with the selected blog post
      res.render('post', { post });
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = postController;
