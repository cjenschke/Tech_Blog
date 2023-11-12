const express = require('express');
const router = require('express').Router();

router.get('/', (req, res) => {
  // Handle logic for retrieving all users
  res.send('Get all users');
});

router.get('/:id', (req, res) => {
  // Handle logic for retrieving a specific user by ID
  const userId = req.params.id;
  res.send(`Get user with ID ${userId}`);
});

router.post('/', (req, res) => {
  // Handle logic for creating a new user
  const { name, email } = req.body;
  res.send(`Create a new user with name ${name} and email ${email}`);
});

router.put('/:id', (req, res) => {
  // Handle logic for updating a specific user by ID
  const userId = req.params.id;
  const { name, email } = req.body;
  res.send(
    `Update user with ID ${userId} - New name: ${name}, New email: ${email}`
  );
});

router.delete('/:id', (req, res) => {
  // Handle logic for deleting a specific user by ID
  const userId = req.params.id;
  res.send(`Delete user with ID ${userId}`);
});

module.exports = router;
