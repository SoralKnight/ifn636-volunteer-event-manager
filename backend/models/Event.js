const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    location: { type: String, required: true, trim: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ['OPEN', 'CLOSED', 'CANCELLED'],
      default: 'OPEN',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);