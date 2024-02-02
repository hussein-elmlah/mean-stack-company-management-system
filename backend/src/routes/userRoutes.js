const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST register a new user
router.post('/register', userController.register);

// POST login an existing user
router.post('/login', userController.login);

// GET user profile (protected route)
router.get('/profile', userController.getUserProfile);

// PUT update user profile (protected route)
router.put('/profile', userController.updateUserProfile);

// POST logout user (protected route)
router.post('/logout', userController.logout);

module.exports = router;
