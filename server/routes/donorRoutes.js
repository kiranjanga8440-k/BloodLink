const express = require("express");
const router = express.Router();

const Donor = require("../models/Donor");

// Register donor
router.post("/register", async (req, res) => {
  try {
    const donor = new Donor(req.body);

    await donor.save();

    res.json({
      success: true,
      message: "Donor Registered Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Get all donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;