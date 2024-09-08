const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
// const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new project (POST /projects)
router.post('/addNewProjects',  createProject);

// Route to get all projects (GET /projects)
router.get('/seeProjects', getAllProjects);

// Route to get a single project by ID (GET /projects/:id)
router.get('/projects/:id', getProjectById);

// Route to update a project (PUT /projects/:id)
router.put('/projects/:id',  updateProject);

// Route to delete a project (DELETE /projects/:id)
router.delete('/projects/:id',  deleteProject);

module.exports = router;
