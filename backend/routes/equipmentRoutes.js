const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizeRole");
const {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipmentController");
const router = express.Router();

// Create new equipment (Inventory Manager only)
router.post("/", authenticateToken, authorizeRole(["Inventory Manager"]), createEquipment);

// Get all equipment
router.get("/", authenticateToken, getAllEquipment);

// Get specific equipment by ID
router.get("/:id", authenticateToken, getEquipmentById);

// Update equipment (Inventory Manager only)
router.put("/:id", authenticateToken, authorizeRole(["Inventory Manager"]), updateEquipment);

// Delete equipment (Inventory Manager only)
router.delete("/:id", authenticateToken, authorizeRole(["Inventory Manager"]), deleteEquipment);

module.exports = router;