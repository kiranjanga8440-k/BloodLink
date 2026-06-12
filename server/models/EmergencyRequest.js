const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema
);