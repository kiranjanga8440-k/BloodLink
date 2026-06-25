const express = require("express");
const router = express.Router();

const EmergencyRequest = require("../models/EmergencyRequest");
const Donor = require("../models/Donor");
const authMiddleware = require("../middleware/auth");

// Medical compatibility helper mapping recipient to eligible donor blood groups
const getCompatibleBloodGroups = (recipientBg) => {
  const map = {
    "A+": ["A+", "A-", "O+", "O-"],
    "A-": ["A-", "O-"],
    "B+": ["B+", "B-", "O+", "O-"],
    "B-": ["B-", "O-"],
    "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "AB-": ["AB-", "A-", "B-", "O-"],
    "O+": ["O+", "O-"],
    "O-": ["O-"]
  };
  return map[recipientBg.toUpperCase()] || [recipientBg];
};

// Create emergency request
router.post("/", async (req, res) => {
  try {
    const request = new EmergencyRequest(req.body);
    await request.save();

    // Trigger email alerts in the background
    const compatibleGroups = getCompatibleBloodGroups(request.bloodGroup);
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    
    const donors = await Donor.find({
      bloodGroup: { $in: compatibleGroups },
      city: { $regex: new RegExp(request.city.trim(), "i") },
      verified: true,
      $or: [
        { lastDonationDate: null },
        { lastDonationDate: { $lte: ninetyDaysAgo } }
      ]
    });

    const { sendEmergencyAlertEmail } = require("../utils/emailHelper");
    donors.forEach(donor => {
      sendEmergencyAlertEmail({ donor, request });
    });

    res.json({
      success: true,
      message: `Emergency Request Submitted. Found ${donors.length} matching donor(s) and sent alerts.`,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Get all emergency requests
router.get("/", async (req, res) => {
  try {
    const requests = await EmergencyRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Delete request
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await EmergencyRequest.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.json({
      success: true,
      message: "Request deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Match donors with medical compatibility and 90-day cooldown check
router.get("/match/:bloodGroup/:city", authMiddleware, async (req, res) => {
  try {
    const { bloodGroup, city } = req.params;

    const compatibleGroups = getCompatibleBloodGroups(bloodGroup);
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

    const donors = await Donor.find({
      bloodGroup: { $in: compatibleGroups },
      city: { $regex: new RegExp(city.trim(), "i") },
    });

    const enrichedDonors = donors.map(donor => {
      const donorObj = donor.toObject();
      const inCooldown = donor.lastDonationDate && (new Date(donor.lastDonationDate) > ninetyDaysAgo);
      donorObj.isEligible = donor.verified && !inCooldown;
      donorObj.cooldownStatus = inCooldown ? "in-cooldown" : "eligible";
      return donorObj;
    });

    res.json({
      success: true,
      count: enrichedDonors.length,
      donors: enrichedDonors,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;