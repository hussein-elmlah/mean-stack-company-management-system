// controllers/departmentController.js
import Department from '../models/Department.js';
import asyncHandler from '../../../lib/asyncHandler.js';

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
  try {
    const { departmentId } = req.params;
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const createDepartment = asyncHandler(async (req, res) => {
  try {
    const departmentData = req.body;
    const newDepartment = await Department.create(departmentData);
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const updateDepartment = asyncHandler(async (req, res) => {
  try {
    const { departmentId } = req.params;
    const updatedFields = req.body;

    const updatedDepartment = await Department.findByIdAndUpdate(departmentId, updatedFields, { new: true });

    if (!updatedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json(updatedDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const deleteDepartment = asyncHandler(async (req, res) => {
  try {
    const { departmentId } = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(departmentId);

    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
