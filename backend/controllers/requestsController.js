const db = require("../config/db");

// Create a new transfer or allocation request
exports.createRequest = (req, res) => {
  const { equipmentID, requestType, fromOfficeID, toOfficeID, requestedFor, remarks } = req.body;

  const requestedByID = req.user.userID; // Assuming the user making the request is stored in req.user

  const query = `
        INSERT INTO Requests (EquipmentID, RequestType, RequestedByID, FromOfficeID, ToOfficeID, RequestedFor, Remarks, RequestDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)
    `;
  const values = [equipmentID, requestType, requestedByID, fromOfficeID, toOfficeID, requestedFor, remarks];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error creating request" });
    }
    res.status(201).json({ message: "Request created successfully", requestId: result.insertId });
  });
};

// Get all requests
exports.getAllRequests = (req, res) => {
  const query = `
        SELECT Requests.*, Equipment.Equipment, Users.FirstName, Users.LastName, Offices.Region, Offices.Province
        FROM Requests
        JOIN Equipment ON Requests.EquipmentID = Equipment.EquipmentID
        JOIN Users ON Requests.RequestedByID = Users.UserID
        JOIN Offices ON Requests.ToOfficeID = Offices.OfficeID
    `;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching requests" });
    }
    res.status(200).json(results);
  });
};

// Get specific request by ID
exports.getRequestById = (req, res) => {
  const query = `
        SELECT Requests.*, Equipment.Equipment, Users.FirstName, Users.LastName, Offices.Region, Offices.Province
        FROM Requests
        JOIN Equipment ON Requests.EquipmentID = Equipment.EquipmentID
        JOIN Users ON Requests.RequestedByID = Users.UserID
        JOIN Offices ON Requests.ToOfficeID = Offices.OfficeID
        WHERE RequestID = ?
    `;
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error fetching request" });
    }
    if (result.length === 0) return res.status(404).json({ error: "Request not found" });
    res.status(200).json(result[0]);
  });
};

// Update request status
exports.updateRequestStatus = (req, res) => {
  const { status } = req.body;
  const processedBy = req.user.userID; // Assuming the user processing the request is stored in req.user
  const query = `
        UPDATE Requests SET RequestStatus = ?, DateProcessed = CURRENT_DATE, ProcessedBy = ?
        WHERE RequestID = ?
    `;
  const values = [status, processedBy, req.params.id];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error updating request status" });
    }
    res.status(200).json({ message: "Request status updated successfully" });
  });
};

// Delete a request
exports.deleteRequest = (req, res) => {
  const query = "DELETE FROM Requests WHERE RequestID = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error deleting request" });
    }
    res.status(200).json({ message: "Request deleted successfully" });
  });
};