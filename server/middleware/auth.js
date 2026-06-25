const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: No Token Provided!",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "bloodlink_super_secret_key_123_abc");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Access Denied: Invalid Security Token!",
    });
  }
};

module.exports = authMiddleware;
