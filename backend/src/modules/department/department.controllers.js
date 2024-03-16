import Department from './department.model.js';
import asyncHandler from '../../../lib/asyncHandler.js';
import CustomError from '../../../lib/customError.js';

export const getAllDepartments = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 departments per page

  // Construct filters dynamically based on query parameters
  const filters = {};

  // Extract query parameters and construct filters
  Object.keys(req.query).forEach((param) => {
    // Exclude pagination and order parameters
    if (param !== 'page' && param !== 'limit' && param !== 'order') {
      filters[param] = req.query[param];
    }
  });

  // Calculate the index of the first department to retrieve
  const startIndex = (page - 1) * limit;

  // Fetch departments with pagination, filtering, and sorting
  let query = Department.find(filters);

  // Sorting
  if (req.query.order) {
    const orderField = req.query.order.toLowerCase();
    const sortOrder = orderField.startsWith('-') ? -1 : 1;
    const field = orderField.replace(/^-/, ''); // Remove leading '-'

    // Check if the field exists in the schema to prevent errors
    if (Object.keys(Department.schema.paths).includes(field)) {
      const sortObject = {};
      sortObject[field] = sortOrder;
      query = query.sort(sortObject);
    } else {
      throw new CustomError('Invalid order field', 400);
    }
  }

  const departments = await query.skip(startIndex).limit(limit);

  // Count total number of departments
  const totalDepartments = await Department.countDocuments(filters);

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
