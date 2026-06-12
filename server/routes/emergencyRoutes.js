const express = require("express");
const router = express.Router();

const EmergencyRequest = require("../models/EmergencyRequest");
const Donor = require("../models/Donor");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
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
      city: { $regex: city, $options: "i" },
    });

    // Send emails to donors
    donors.forEach((donor) => {
      if (donor.email) {
        transporter.sendMail({
          from: process.env.EMAIL,
          to: donor.email,
          subject: "🩸 Emergency Blood Request - BloodLink",
          text: `
Hello ${donor.name},

There is an emergency blood request:

Blood Group: ${bloodGroup}
City: ${city}

Please respond if you can donate.

- BloodLink Team
          `,
        });
      }
    });

    res.json({
      success: true,
      count: donors.length,
      donors,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/test-mail", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "BloodLink Test Email",
      text: "Email system is working 🚀",
    });

    res.send("Email sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Email failed");
  }
});

module.exports = router;