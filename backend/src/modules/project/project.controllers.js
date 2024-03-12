import Project from './project.model.js';
import asyncHandler from '../../../lib/asyncHandler.js';
import CustomError from '../../../lib/customError.js';

export const getAllProjects = asyncHandler(async (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 projects per page

  // Filter parameters
  const filters = {};

  // Apply filters based on query parameters
  if (req.query.type) {
    filters.type = req.query.type;
  }
  if (req.query.owner) {
    filters.owner = req.query.owner;
  }
  // Add more filter conditions as needed

  // Calculate the index of the first project to retrieve
  const startIndex = (page - 1) * limit;

  // Fetch projects with pagination and filtering
  const projects = await Project.find(filters)
    .skip(startIndex)
    .limit(limit);

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
