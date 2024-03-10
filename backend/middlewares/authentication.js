import jwt from 'jsonwebtoken';
import asyncHandler from '../lib/asyncHandler.js';
import User from '../src/modules/user/user.model.js';

export const isAuth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header('authorization');
    if (!token) {
      return res.status(403).json('Your are not authenticated please login');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id).exec();
    if (decodedToken) {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(403).json('Your are not authenticated please login');
  }
});
