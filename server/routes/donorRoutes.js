const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");

// Register Donor
router.post("/register", async (req, res) => {
  try {
    const { email, phone } = req.body;

    const existingDonor = await Donor.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingDonor) {
      return res.status(400).json({
        success: false,
        message: "Donor already registered!",
      });
    }

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

// Get All Donors
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
router.delete("/:id", async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Donor deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;