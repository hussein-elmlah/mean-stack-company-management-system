import express from 'express';
import { getAllProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController.mjs';

const router = express.Router();

// GET all projects
router.get('/', getAllProjects);

// GET project by ID
router.get('/:projectId', getProjectById);

// POST create a new project
router.post('/', createProject);

// PUT update a project by ID
router.put('/:projectId', updateProject);

// DELETE project by ID
router.delete('/:projectId', deleteProject);

export default router;
