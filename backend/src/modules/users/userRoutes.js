import express from 'express';
import * as userController from './userController.js'
const router = express.Router();

// POST register a new user
router.post('/register', userController.register);

/*// POST login an existing user
router.post('/login', login);

// GET user profile (protected route)
router.get('/profile', getUserProfile);

// PUT update user profile (protected route)
router.put('/profile', updateUserProfile);

// POST logout user (protected route)
router.post('/logout', logout);*/

export default router;
