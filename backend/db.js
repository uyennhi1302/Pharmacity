const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
});

db.connect((err) => {
  if (err) {
    console.error("Database error:", err);
  } else {
    console.log("MySQL Connected");
    console.log("HOST:", process.env.MYSQLHOST);
    console.log("PORT:", process.env.MYSQLPORT);
  }
});

module.exports = db;