import asyncHandler from '../../../lib/asyncHandler.js';
import Department from './department.model.js';

export const createDepartment = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const department = await Department.create({ name });
  res.status(201).json(department);
});
