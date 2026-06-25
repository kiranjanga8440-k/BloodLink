const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@bloodlink.com" &&
    password === "admin123"
  ) {
    const token = jwt.sign(
      { role: "admin", email },
      process.env.JWT_SECRET || "bloodlink_super_secret_key_123_abc",
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      message: "Login Successful",
      token,
    });
  }

  res.status(401).json({
    success: false,
    message: "Invalid Credentials",
  });
});

module.exports = router;