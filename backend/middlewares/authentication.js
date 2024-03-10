import jwt from 'jsonwebtoken';
import asyncHandler from '../lib/asyncHandler.js';

export const isAuth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.header('token');
    if (!token) {
      return res.status(403).json('Your are not authenticated please login');
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      req.user = verified.user;
      next();
    }
  } catch (error) {
    res.status(403).json('Your are not authenticated please login');
  }
});
