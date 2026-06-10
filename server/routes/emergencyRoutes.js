const express = require("express");
const router = express.Router();

const EmergencyRequest = require("../models/EmergencyRequest");

// Create emergency request
router.post("/", async (req, res) => {
  try {
    const request = new EmergencyRequest(req.body);

    await request.save();

    res.json({
      success: true,
      message: "Emergency Request Submitted",
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
    const requests = await EmergencyRequest.find().sort({
      createdAt: -1,
    });

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;