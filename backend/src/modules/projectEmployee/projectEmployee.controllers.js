import ProjectEmployee from './projectEmployee.model.js';
import asyncHandler from '../../../lib/asyncHandler.js';
import CustomError from '../../../lib/customError.js';

// @desc    Get all project employees
// @route   GET /project-employees
// @access  Public
export const getAllProjectEmployees = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 project employees per page
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


  // Extract other query parameters and construct filters
  Object.keys(req.query).forEach((param) => {
    // Exclude pagination and sorting parameters
    if (!['page', 'limit', 'order'].includes(param)) {
      filters[param] = req.query[param];
    }
  });

  // Calculate the index of the first project employee to retrieve
  const startIndex = (page - 1) * limit;

  // Fetch project employees with pagination, filtering, and sorting
  let query = ProjectEmployee.find(filters);

  // Sorting
  if (req.query.order) {
    const orderField = req.query.order;
    const sortOrder = orderField.startsWith('-') ? -1 : 1;
    const field = orderField.replace(/^-/, ''); // Remove leading '-'

    // Check if the field exists in the schema to prevent errors
    if (Object.keys(ProjectEmployee.schema.paths).includes(field)) {
      const sortObject = {};
      sortObject[field] = sortOrder;
      query = query.sort(sortObject);
    } else {
      throw new CustomError('Invalid order field', 400);
    }
  }

  const projectEmployees = await query.skip(startIndex).limit(limit);

  // Count total number of project employees matching the filters
  const totalProjectEmployees = await ProjectEmployee.countDocuments(filters);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalProjectEmployees / limit);

  // Response with paginated project employees and pagination metadata
  res.json({
    projectEmployees,
    currentPage: page,
    totalPages,
    totalProjectEmployees,
  });
});

// @desc    Get project employee by ID
// @route   GET /project-employees/:projectEmployeeId
// @access  Public
export const getProjectEmployeeById = asyncHandler(async (req, res) => {
  const { projectEmployeeId } = req.params;
  const projectEmployee = await ProjectEmployee.findById(projectEmployeeId);
  if (!projectEmployee) {
    throw new CustomError('Project employee not found', 404);
  }
  res.json(projectEmployee);
});

// @desc    Create a new project employee
// @route   POST /project-employees
// @access  Public
export const createProjectEmployee = asyncHandler(async (req, res) => {
  const projectEmployeeData = req.body;
  const newProjectEmployee = await ProjectEmployee.create(projectEmployeeData);
  res.status(201).json(newProjectEmployee);
});

// @desc    Update project employee by ID
// @route   PUT /project-employees/:projectEmployeeId
// @access  Public
export const updateProjectEmployee = asyncHandler(async (req, res) => {
  const { projectEmployeeId } = req.params;
  const updatedFields = req.body;
  const updatedProjectEmployee = await ProjectEmployee.findByIdAndUpdate(projectEmployeeId, updatedFields, { new: true });
  if (!updatedProjectEmployee) {
    throw new CustomError('Project employee not found', 404);
  }
  res.json(updatedProjectEmployee);
});

// @desc    Delete project employee by ID
// @route   DELETE /project-employees/:projectEmployeeId
// @access  Public
export const deleteProjectEmployee = asyncHandler(async (req, res) => {
  const { projectEmployeeId } = req.params;
  const deletedProjectEmployee = await ProjectEmployee.findByIdAndDelete(projectEmployeeId);
  if (!deletedProjectEmployee) {
    throw new CustomError('Project employee not found', 404);
  }
  res.json({ message: 'Project employee deleted successfully' });
});
