require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

// Import routes
const userRoutes = require("./routes/api/userRoutes");
const videoRoutes = require("./routes/api/videoRoutes");
const todoRoutes = require("./routes/api/todoRoutes");

const app = express();
const PORT = process.env.PORT || 8008;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/", todoRoutes);

// Catch all for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

db.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});