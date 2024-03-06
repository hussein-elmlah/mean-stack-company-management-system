import Project from './project.model.js';
import asyncHandler from '../../../lib/asyncHandler.js';

export const getAllProjects = asyncHandler(async (req, res) => {
  // Pagination parameters
  console.log('getAllProjects', req.query.project);
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default limit to 10 projects per page

  console.log('page', page, '/n/n', 'limit', limit);
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
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const createProject = asyncHandler(async (req, res) => {
  try {
    const projectData = req.body;
    const newProject = await Project.create(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const updateProject = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedFields = req.body;

    const updatedProject = await Project.findByIdAndUpdate(projectId, updatedFields, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export const deleteProject = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;

    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
