const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  serviceInterested: {
    type: String,
    required: false, // Optional, can specify which service the inquiry is about
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['received', 'in-progress', 'resolved', 'closed'],
    default: 'received', // Default status of the inquiry
  },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
