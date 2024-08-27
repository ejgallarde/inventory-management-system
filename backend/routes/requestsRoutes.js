const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizeRole");
const {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
  deleteRequest,
} = require("../controllers/requestsController");
const router = express.Router();

// Create a new transfer or allocation request
router.post("/", authenticateToken, createRequest);

// Get all requests (Admin and Inventory Manager)
router.get(
  "/",
  authenticateToken,
  authorizeRole(["Central Office Administrator", "Inventory Manager"]),
  getAllRequests
);

// Get a specific request by ID
router.get("/:id", authenticateToken, getRequestById);

// Update request status (Admin and Inventory Manager)
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["Central Office Administrator", "Inventory Manager"]),
  updateRequestStatus
);

// Delete a request (only by the person who made the request or Admin)
router.delete("/:id", authenticateToken, deleteRequest);

module.exports = router;
