const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET all projects
router.get('/', projectController.getAllProjects);

// GET project by ID
router.get('/:projectId', projectController.getProjectById);

// POST create a new project
router.post('/', projectController.createProject);

// PUT update a project by ID
router.put('/:projectId', projectController.updateProject);

// DELETE project by ID
router.delete('/:projectId', projectController.deleteProject);

module.exports = router;
