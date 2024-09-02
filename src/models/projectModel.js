const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: false, // Optional, can be used to specify the client name
  },
  technologiesUsed: {
    type: [String], // Array of technologies used in the project
    required: false,
  },
  startDate: {
    type: Date,
    required: false, // Optional, can be used to specify the start date of the project
  },
  endDate: {
    type: Date,
    required: false, // Optional, can be used to specify the end date or completion date of the project
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'paused', 'on hold'], // Possible statuses of the project
    default: 'ongoing',
  },
  teamMembers: {
    type: [String], // Array of team members involved in the project
    required: false,
  },
  images: {
    type: [String], // Array of URLs or paths to images related to the project
    required: false,
  },
  projectLink: {
    type: String,
    required: false, // URL link to the live project or case study, if available
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
