const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Handle logic for retrieving all posts
  res.send('Get all posts');
});

router.get('/:id', (req, res) => {
  // Handle logic for retrieving a specific post by ID
  const postId = req.params.id;
  res.send(`Get post with ID ${postId}`);
});

router.post('/', (req, res) => {
  // Handle logic for creating a new post
  const { title, content } = req.body;
  res.send(`Create a new post with title ${title} and content ${content}`);
});

router.put('/:id', (req, res) => {
  // Handle logic for updating a specific post by ID
  const postId = req.params.id;
  const { title, content } = req.body;
  res.send(
    `Update post with ID ${postId} - New title: ${title}, New content: ${content}`
  );
});

router.delete('/:id', (req, res) => {
  // Handle logic for deleting a specific post by ID
  const postId = req.params.id;
  res.send(`Delete post with ID ${postId}`);
});

module.exports = router;
