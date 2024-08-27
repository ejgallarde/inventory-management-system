const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// Register a new user
exports.register = (req, res) => {
  const { firstName, lastName, email, password, userRole, officeID } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    const values = [
      firstName,
      lastName,
      userRole,
      email,
      officeID,
      hash,
      true,
    ];

    // Insert the user into the database
    const query = `
    INSERT INTO Users 
    (FirstName, LastName, UserRole, Email, OfficeID, PasswordHash, IsActive)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error registering user" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

// Login an existing user
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const query = "SELECT * FROM Users WHERE Email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];

    // Compare the password with the stored hash
    bcrypt.compare(password, user.PasswordHash, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userID: user.UserID, role: user.UserRole }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({
        token: token,
        userRole: user.UserRole, // Assuming userRole is a field in your User model
      });
    });
  });
};

