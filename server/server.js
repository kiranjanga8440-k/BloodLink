const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const donorRoutes = require("./routes/donorRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const app = express();

const cors = require("cors");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});