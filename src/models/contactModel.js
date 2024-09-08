const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
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
 
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
