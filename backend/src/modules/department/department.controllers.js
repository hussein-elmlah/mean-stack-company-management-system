import Department from './department.model.js';
import asyncHandler from '../../../lib/asyncHandler.js';
import CustomError from '../../../lib/customError.js';

export const getAllDepartments = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 departments per page

  // Filter parameters
  const filters = {};

  // Apply filters based on query parameters
  // No filters are applied in this example, but you can add them as needed

  // Calculate the index of the first department to retrieve
  const startIndex = (page - 1) * limit;

  // Fetch departments with pagination and filtering
  const departments = await Department.find(filters)
    .skip(startIndex)
    .limit(limit);

  // Count total number of departments
  const totalDepartments = await Department.countDocuments();

  // Calculate total number of pages
  const totalPages = Math.ceil(totalDepartments / limit);

  // Response with paginated departments and pagination metadata
  res.json({
    departments,
    currentPage: page,
    totalPages,
    totalDepartments,
  });
});

export const getDepartmentById = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const department = await Department.findById(departmentId);

  if (!department) {
    throw new CustomError('Department not found', 404);
  }

  res.json(department);
});

export const createDepartment = asyncHandler(async (req, res) => {
  const departmentData = req.body;
  const newDepartment = await Department.create(departmentData);
  res.status(201).json(newDepartment);
});

export const updateDepartment = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const updatedFields = req.body;

  const updatedDepartment = await Department.findByIdAndUpdate(departmentId, updatedFields, { new: true });

  if (!updatedDepartment) {
    throw new CustomError('Department not found', 404);
  }

  res.json(updatedDepartment);
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const deletedDepartment = await Department.findByIdAndDelete(departmentId);

  if (!deletedDepartment) {
    throw new CustomError('Department not found', 404);
  }

  res.json({ message: 'Department deleted successfully' });
});
