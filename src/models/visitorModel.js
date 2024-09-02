const mongoose = require('mongoose');

const visitorInteractionSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
  },
  browserInfo: {
    type: String,
    required: true,
  },
  interactionType: {
    type: String,
    required: true,
    enum: ['formSubmission', 'serviceInquiry', 'newsletterSignup', 'pageView', 'other'],
  },
  interactionData: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const VisitorInteraction = mongoose.model('VisitorInteraction', visitorInteractionSchema);

module.exports = VisitorInteraction;
