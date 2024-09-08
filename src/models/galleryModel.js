const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  //   required: false, // Optional, description of the image or media file
  // },
  images: {
    type: String,
    required: true, // URL or path to the image or media file
  },
  // category: {
  //   type: String,
  //   required: false, // Optional, category of the image (e.g., Event, Project)
  // },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
