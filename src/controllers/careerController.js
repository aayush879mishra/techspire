const JobPosting = require('../models/careerModel');
const mongoose = require('mongoose');


// Create a new job posting
exports.createJobPosting = async (req, res) => {
  try {
    const { title, description, department, location, employmentType, qualifications, responsibilities, salaryRange, applicationDeadline } = req.body;

    const jobPosting = new JobPosting({
      title,
      description,
      department,
      location,
      employmentType,
      qualifications,
      responsibilities,
      salaryRange,
      applicationDeadline,
    });

    await jobPosting.save();
    res.status(201).json(jobPosting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all job postings
exports.getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    res.json(jobPostings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single job posting by ID
exports.getJobPostingById = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findById(req.params.id);
    if (!jobPosting) {
      return res.status(404).json({ msg: 'Job posting not found' });
    }
    res.json(jobPosting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a job posting
exports.updateJobPosting = async (req, res) => {
  try {
    const { title, description, department, location, employmentType, qualifications, responsibilities, salaryRange, applicationDeadline } = req.body;

    let jobPosting = await JobPosting.findById(req.params.id);
    if (!jobPosting) {
      return res.status(404).json({ msg: 'Job posting not found' });
    }

    jobPosting.title = title || jobPosting.title;
    jobPosting.description = description || jobPosting.description;
    jobPosting.department = department || jobPosting.department;
    jobPosting.location = location || jobPosting.location;
    jobPosting.employmentType = employmentType || jobPosting.employmentType;
    jobPosting.qualifications = qualifications || jobPosting.qualifications;
    jobPosting.responsibilities = responsibilities || jobPosting.responsibilities;
    jobPosting.salaryRange = salaryRange || jobPosting.salaryRange;
    jobPosting.applicationDeadline = applicationDeadline || jobPosting.applicationDeadline;

    await jobPosting.save();
    res.json(jobPosting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



// Delete a job posting
exports.deleteJobPosting = async (req, res) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }

    // Attempt to find and delete the job posting by ID
    const result = await JobPosting.findByIdAndDelete(req.params.id);
    
    // Check if the job posting was found and deleted
    if (!result) {
      return res.status(404).json({ msg: 'Job posting not found' });
    }

    // Send a success response
    res.json({ msg: 'Job posting removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

