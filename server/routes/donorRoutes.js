const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const authMiddleware = require("../middleware/auth");

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

    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const enrichedDonors = donors.map(donor => {
      const donorObj = donor.toObject();
      const inCooldown = donor.lastDonationDate && (new Date(donor.lastDonationDate) > ninetyDaysAgo);
      donorObj.isEligible = !inCooldown;
      donorObj.cooldownStatus = inCooldown ? "in-cooldown" : "eligible";
      return donorObj;
    });

    res.json(enrichedDonors);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Verify Donor
router.put("/verify/:id", authMiddleware, async (req, res) => {
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

    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const donorObj = donor.toObject();
    const inCooldown = donor.lastDonationDate && (new Date(donor.lastDonationDate) > ninetyDaysAgo);
    donorObj.isEligible = donor.verified && !inCooldown;
    donorObj.cooldownStatus = inCooldown ? "in-cooldown" : "eligible";

    res.json(donorObj);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Donor
router.delete("/:id", authMiddleware, async (req, res) => {
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
router.get("/", authMiddleware, async (req, res) => {
  try {
    const donors = await Donor.find();

    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const enrichedDonors = donors.map(donor => {
      const donorObj = donor.toObject();
      const inCooldown = donor.lastDonationDate && (new Date(donor.lastDonationDate) > ninetyDaysAgo);
      donorObj.isEligible = donor.verified && !inCooldown;
      donorObj.cooldownStatus = inCooldown ? "in-cooldown" : "eligible";
      return donorObj;
    });

    res.json(enrichedDonors);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


module.exports = router;