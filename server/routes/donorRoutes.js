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

    if (req.body.age < 18) {
      return res.status(400).json({
        success: false,
        message: "Donor must be at least 18 years old",
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

// Dashboard Statistics
router.get("/stats", async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();
    const verifiedDonors = await Donor.countDocuments({
      verified: true,
    });
    const unverifiedDonors = await Donor.countDocuments({
      verified: false,
    });

    res.json({
      totalDonors,
      verifiedDonors,
      unverifiedDonors,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Total Donor Count
router.get("/count", async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();

    res.json({
      totalDonors,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get Verified Donors
router.get("/verified", async (req, res) => {
  try {
    const donors = await Donor.find({
      verified: true,
    });

    res.json(donors);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Verify Donor
router.put("/verify/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found",
      });
    }

    donor.verified = true;
    await donor.save();

    res.json({
      success: true,
      message: "Donor verified successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        message: "Donor not found",
      });
    }

    res.json(donor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Donor
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


module.exports = router;