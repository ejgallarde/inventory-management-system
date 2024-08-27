const mysql = require("mysql");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

// Create the database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

module.exports = connection;
