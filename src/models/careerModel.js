const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'], // Adjust as needed
    required: true,
  },
  qualifications: {
    type: String,
    required: false, // Optional, details about qualifications or skills required
  },
  responsibilities: {
    type: String,
    required: false, // Optional, details about job responsibilities
  },
  salaryRange: {
    type: String,
    required: false, // Optional, salary range for the position
  },
  applicationDeadline: {
    type: Date,
    required: false, // Optional, deadline for applying to the job
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
