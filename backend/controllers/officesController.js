const db = require("../config/db");

// Create a new office
exports.createOffice = (req, res) => {
  const { region, province, officeType, address, contactPerson, contactNumber, email } = req.body;
  const query = `
        INSERT INTO Offices (Region, Province, OfficeType, Address, ContactPerson, ContactNumber, Email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [region, province, officeType, address, contactPerson, contactNumber, email];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error creating office" });
    }
    res.status(201).json({ message: "Office created successfully", officeId: result.insertId });
  });
};

// Get all offices
exports.getOffices = (req, res) => {
  const query = "SELECT * FROM Offices";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching offices" });
    }
    res.status(200).json(results);
  });
};

// Get a specific office by ID
exports.getOfficeById = (req, res) => {
  const query = "SELECT * FROM Offices WHERE OfficeID = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching office" });
    }
    if (result.length === 0) return res.status(404).json({ error: "Office not found" });
    res.status(200).json(result[0]);
  });
};

// Update an office
exports.updateOffice = (req, res) => {
  const { region, province, officeType, address, contactPerson, contactNumber, email } = req.body;
  const query = `
        UPDATE Offices SET Region = ?, Province = ?, OfficeType = ?, Address = ?, ContactPerson = ?, ContactNumber = ?, Email = ?
        WHERE OfficeID = ?
    `;
  const values = [region, province, officeType, address, contactPerson, contactNumber, email, req.params.id];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating office" });
    }
    res.status(200).json({ message: "Office updated successfully" });
  });
};

// Delete an office
exports.deleteOffice = (req, res) => {
  const query = "DELETE FROM Offices WHERE OfficeID = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error deleting office" });
    }
    res.status(200).json({ message: "Office deleted successfully" });
  });
};
