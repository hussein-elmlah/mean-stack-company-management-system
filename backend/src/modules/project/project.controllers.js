import Project from './project.model.js';
import asyncHandler from '../../../lib/asyncHandler.js';
import CustomError from '../../../lib/customError.js';

export const getAllProjects = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 projects per page
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
        { location: { $regex: searchRegex } }, // Fuzzy search on 'location' field
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

  // Calculate the index of the first project to retrieve
  const startIndex = (page - 1) * limit;

  // Fetch projects with pagination, filtering, and sorting
  let query = Project.find(filters); // check for error (when adding await makes error)

  // Sorting
  if (req.query.order) {
    const orderField = req.query.order;
    const sortOrder = orderField.startsWith('-') ? -1 : 1;
    const field = orderField.replace(/^-/, '');

    const sortCriteria = {};
    sortCriteria[field] = sortOrder;

    query = query.sort(sortCriteria);
  }

  const projects = await query.skip(startIndex).limit(limit);

  // Count total number of projects matching the filters
  const totalProjects = await Project.countDocuments(filters);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalProjects / limit);

  // Response with paginated projects and pagination metadata
  res.json({
    projects,
    currentPage: page,
    totalPages,
    totalProjects,
  });
});

export const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  
  if (!project) {
    throw new CustomError('Project not found', 404);
  }

  res.json(project);
});

export const createProject = asyncHandler(async (req, res) => {
  const projectData = req.body;
  const newProject = await Project.create(projectData);
  res.status(201).json(newProject);
});

export const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const updatedFields = req.body;
  const updatedProject = await Project.findByIdAndUpdate(projectId, updatedFields, { new: true });

  if (!updatedProject) {
    throw new CustomError('Project not found', 404);
  }

  res.json(updatedProject);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) {
    throw new CustomError('Project not found', 404);
  }

  res.json({ message: 'Project deleted successfully' });
});