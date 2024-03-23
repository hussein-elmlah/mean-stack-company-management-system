import Department from './department.model.js';
import asyncHandler from '../../../lib/asyncHandler.js';
import CustomError from '../../../lib/customError.js';

export const getAllDepartments = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 departments per page
  // handle pagination out of bounds parameters
  if (page < 1) {
    return res.status(400).json({
      success: false,
      message: 'Invalid page number',
    });
  }
  if (limit < 1 || limit > 100) {
    return res.status(400).json({
      success: false,
      message: 'Invalid limit number',
    });
  }

  // Construct filters dynamically based on query parameters
  let filters = {};

  // Check if the 'search' parameter is present and if it's applicable for fuzzy search
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i'); // 'i' for case-insensitive
    filters = {
      $or: [
        { name: { $regex: searchRegex } }, // Fuzzy search on 'name' field
        // Add more fields here for search as needed
      ],
    };
  }

  // Extract other query parameters and construct filters
  Object.keys(req.query).forEach((param) => {
    // Exclude pagination, sorting, and search parameters
    if (!['page', 'limit', 'order', 'search'].includes(param))
    {
      filters[param] = req.query[param];
    }
  });

  // Calculate the index of the first department to retrieve
  const startIndex = (page - 1) * limit;

  // Fetch departments with pagination, filtering, and sorting
  let query = Department.find(filters);

  // Sorting
  if (req.query.order) {
    const orderField = req.query.order;
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

  // Count total number of departments matching the filters
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
