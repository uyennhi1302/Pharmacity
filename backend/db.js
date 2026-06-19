const mysql = require("mysql2");

const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection error:", err);
        return;
    }

    console.log("✅ Connected to MySQL");
});

module.exports = db;