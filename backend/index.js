require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDb = require("./db/db");

// routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");

const app = express();


app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);


app.get("/", (req, res) => {
  res.send("API is running");
});


const PORT = process.env.PORT || 9922;

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
