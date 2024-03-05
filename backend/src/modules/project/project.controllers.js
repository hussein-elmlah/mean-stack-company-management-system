import Project from './project.model.js';
import asyncHandler from '../../../lib/asyncHandler.js';

export const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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
