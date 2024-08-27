const db = require("../config/db");

// Create new equipment
exports.createEquipment = (req, res) => {
  const {
    equipment,
    equipmentDescription,
    category,
    serialNumber,
    propertyNumber,
    parPtrIcsNumber,
    dateReceived,
    currentStatus,
    remarks,
    maintenanceID,
    issuedTo,
    locationID,
    purchaseOrderID,
  } = req.body;

  const query = `
        INSERT INTO Equipment (Equipment, EquipmentDescription, Category, SerialNumber, PropertyNumber, ParPtrIcsNumber, DateReceived, CurrentStatus, Remarks, MaintenanceID, IssuedTo, LocationID, PurchaseOrderID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    equipment,
    equipmentDescription,
    category,
    serialNumber,
    propertyNumber,
    parPtrIcsNumber,
    dateReceived,
    currentStatus || "Received",
    remarks,
    maintenanceID,
    issuedTo,
    locationID,
    purchaseOrderID,
  ];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error creating equipment" });
    }
    res.status(201).json({ message: "Equipment created successfully", equipmentId: result.insertId });
  });
};

// Get all equipment
exports.getAllEquipment = (req, res) => {
  const query = "SELECT * FROM Equipment";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching equipment" });
    }
    res.status(200).json(results);
  });
};

// Get specific equipment by ID
exports.getEquipmentById = (req, res) => {
  const query = "SELECT * FROM Equipment WHERE EquipmentID = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching equipment" });
    }
    if (result.length === 0) return res.status(404).json({ error: "Equipment not found" });
    res.status(200).json(result[0]);
  });
};

// Update equipment
exports.updateEquipment = (req, res) => {
  const {
    Equipment,
    EquipmentDescription,
    Category,
    SerialNumber,
    PropertyNumber,
    ParPtrIcsNumber,
    DateReceived,
    CurrentStatus,
    Remarks,
    MaintenanceID,
    IssuedTo,
    LocationID,
    PurchaseOrderID,
  } = req.body;

  const equipmentID = req.params.id;
  const formattedDateReceived = DateReceived ? new Date(DateReceived).toISOString().split("T")[0] : null;

  const query = `
        UPDATE Equipment SET Equipment = ?, EquipmentDescription = ?, Category = ?, SerialNumber = ?, PropertyNumber = ?, ParPtrIcsNumber = ?, DateReceived = ?, CurrentStatus = ?, Remarks = ?, MaintenanceID = ?, IssuedTo = ?, LocationID = ?, PurchaseOrderID = ?
        WHERE EquipmentID = ?
    `;
  const values = [
    Equipment || null,
    EquipmentDescription || null,
    Category || null,
    SerialNumber || null,
    PropertyNumber || null,
    ParPtrIcsNumber || null,
    formattedDateReceived || null,
    CurrentStatus || null,
    Remarks || null,
    MaintenanceID || null,
    IssuedTo || null,
    LocationID || null,
    PurchaseOrderID || null,
    equipmentID, // EquipmentID from the URL parameter
  ];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating equipment" });
    }
    res.status(200).json({ message: "Equipment updated successfully" });
  });
};

// Delete equipment
exports.deleteEquipment = (req, res) => {
  const query = "DELETE FROM Equipment WHERE EquipmentID = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error deleting equipment" });
    }
    res.status(200).json({ message: "Equipment deleted successfully" });
  });
};
