require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import database connection and routes
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const officesRoutes = require("./routes/officesRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const requestsRoutes = require("./routes/requestsRoutes");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/offices", officesRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/requests", requestsRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Inventory Management API is running!");
});

module.exports = app;
