const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizeRole");
const router = express.Router();

// Example of a protected route for Inventory Managers only
router.get("/inventory-manager", authenticateToken, authorizeRole(["Inventory Manager"]), (req, res) => {
  res.json({ message: "This is a protected route for Inventory Managers only!" });
});

module.exports = router;
