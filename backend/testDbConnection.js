const connection = require("./config/db");

// Simple query to test the connection
connection.query("SELECT 1 + 1 AS solution", (err, results, fields) => {
  if (err) throw err;
  console.log("Database connection test successful: ", results[0].solution);
  connection.end(); // Close the connection after the test
});
