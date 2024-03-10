import express from 'express';
import * as userController from './user.controllers.js';
import { isAuth } from '../../../middlewares/authentication.js';

const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

// router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.get('/', isAuth, userController.getUserProfile);

router.put('/profile', isAuth, userController.updateUserProfile);

router.delete('/profile', isAuth, userController.deleteUser);

export default router;
