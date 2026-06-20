const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  age: {
    type: Number,
    required: true,
  },

  bloodGroup: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },

  city: {
    type: String,
    required: true,
  },

  aadhaarDocument: {
    type: String,
    default: "",
  },

  verified: {
    type: Boolean,
    default: true,
  },

  available: {
    type: Boolean,
    default: true,
  },

  lastDonationDate: {
    type: Date,
    default: null,
  },

  totalDonations: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Donor", donorSchema);