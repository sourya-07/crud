require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDb = require("./db/db");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");

const app = express();
const PORT = process.env.PORT || 9922;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDb();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API is running"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});
