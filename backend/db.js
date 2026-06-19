const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
app.get("/test", (req, res) => {
  res.json({ status: "OK" });
});
db.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection error:", err);
        return;
    }
    console.log("✅ Connected to MySQL");
});

module.exports = db;