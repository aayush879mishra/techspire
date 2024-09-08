const Project = require('../models/projectModel');
const mongoose = require('mongoose');


// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, client, technologiesUsed, startDate, endDate, status, teamMembers, images, projectLink } = req.body;

    const project = new Project({
      title,
      description,
      client,
      technologiesUsed,
      startDate,
      endDate,
      status,
      teamMembers,
      images,
      projectLink,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { title, description, client, technologiesUsed, startDate, endDate, status, teamMembers, images, projectLink } = req.body;

    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.client = client || project.client;
    project.technologiesUsed = technologiesUsed || project.technologiesUsed;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    project.status = status || project.status;
    project.teamMembers = teamMembers || project.teamMembers;
    project.images = images || project.images;
    project.projectLink = projectLink || project.projectLink;

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }

    // Attempt to find and delete the project by ID
    const result = await Project.findByIdAndDelete(req.params.id);
    
    // Check if the project was found and deleted
    if (!result) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Send a success response
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

