const express = require("express");
const router = express.Router();

const EmergencyRequest = require("../models/EmergencyRequest");
const Donor = require("../models/Donor");
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
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    console.log("DELETE ID:", id);

    const deleted = await EmergencyRequest.findByIdAndDelete(id);

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
    console.log("DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/match/:bloodGroup/:city", async (req, res) => {
  try {
    const { bloodGroup, city } = req.params;

    const donors = await Donor.find({
      bloodGroup,
      city: city.toLowerCase(),
    });

    res.json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;