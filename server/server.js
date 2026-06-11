const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const donorRoutes = require("./routes/donorRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const app = express();
const adminRoutes = require("./routes/adminRoutes");



app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/donors", donorRoutes);
app.use("/api/emergency", emergencyRoutes);

app.get("/", (req, res) => {
  res.send("BloodLink Backend Running 🚀");
});
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running"
  });
});
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});