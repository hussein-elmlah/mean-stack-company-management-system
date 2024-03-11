import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './user.model.js';
import asyncHandler from '../../../lib/asyncHandler.js';
import { hashFunction, compareFunction } from '../../../lib/hashAndCompare.js';
import { generateTokenUser } from '../../../utils/jwtUtils.js';

// eslint-disable-next-line import/prefer-default-export
export const register = asyncHandler(async (req, res) => {
  const {
    username, password, firstName, email, lastName, dateOfBirth, address, jobLevel, mobileNumber, contract,
  } = req.body;
  const hashedPassword = await hashFunction({ plainText: password });
  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstName,
      email,
      lastName,
      dateOfBirth,
      address,
      jobLevel,
      mobileNumber,
      contract,
    });
    res.status(201).json({ message: 'User registered successfully', newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const passwordMatch = await compareFunction({ plainText: password, hash: user.password });

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateTokenUser(user);
  // console.log(token);
  res.json({ user: token });
});

export const paginateResults = (page, pageSize, users, usersCount) => {
  const startIndex = (page - 1) * pageSize;
  // eslint-disable-next-line radix
  const endIndex = Math.min(parseInt(startIndex) + parseInt(pageSize), usersCount);
  const paginatedData = users.slice(startIndex, endIndex);
  return paginatedData;
};

export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 1 } = req.query;

  try {
    const users = await User.find();
    const usersCount = await User.countDocuments();
    const paginatedUsers = paginateResults(page, pageSize, users, usersCount);

    res.json({
      users: paginatedUsers,
      usersCount,
      currentPage: parseInt(page),
      totalPages: Math.ceil(usersCount / parseInt(pageSize)),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ user });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  try {
    console.log(req.user.id);
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user.id;
    const updatedFields = req.body;

    const user = await User.findOneAndUpdate(userId, updatedFields, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.user.id;

    const user = await User.findOneAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
