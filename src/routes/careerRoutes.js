const express = require('express');
const router = express.Router();
const { createJobPosting, getAllJobPostings, getJobPostingById, updateJobPosting, deleteJobPosting } = require('../controllers/careerController');
// const authMiddleware = require('../middleware/authMiddleware');

// Route to create a new job posting (POST /job-postings)
router.post('/addNewjob-postings',  createJobPosting);

// Route to get all job postings (GET /job-postings)
router.get('/seejob-postings', getAllJobPostings);

// Route to get a single job posting by ID (GET /job-postings/:id)
router.get('/job-postings/:id', getJobPostingById);

// Route to update a job posting (PUT /job-postings/:id)
router.put('/job-postings/:id', updateJobPosting);

// Route to delete a job posting (DELETE /job-postings/:id)
router.delete('/job-postings/:id',  deleteJobPosting);

module.exports = router;
