const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['graphic designing', 'digital marketing', 'copywriting', 'video editing', 'mobile app development'], // Adjust as needed
    required: true,
  },
  price: {
    type: Number,
    required: false, // Optional, depending on whether you want to list prices
  },
  duration: {
    type: String,
    required: false, // Optional, can be used to describe service duration
  },
  image: {
    type: String,
    required: false, // URL or path to an image representing the service
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
