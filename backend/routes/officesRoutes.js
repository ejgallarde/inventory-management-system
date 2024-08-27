const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizeRole");
const {
  createOffice,
  getOffices,
  getOfficeById,
  updateOffice,
  deleteOffice,
} = require("../controllers/officesController");
const router = express.Router();

// Create a new office (Admin only)
router.post("/", authenticateToken, authorizeRole(["Central Office Administrator"]), createOffice);

// Get all offices
router.get("/", authenticateToken, getOffices);

// Get a specific office by ID
router.get("/:id", authenticateToken, getOfficeById);

// Update an office (Admin only)
router.put("/:id", authenticateToken, authorizeRole(["Central Office Administrator"]), updateOffice);

// Delete an office (Admin only)
router.delete("/:id", authenticateToken, authorizeRole(["Central Office Administrator"]), deleteOffice);

module.exports = router;
