const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection error:", err);
        return;
    }
    console.log("✅ Connected to MySQL");
    console.log("HOST:", process.env.MYSQLHOST);
    console.log("PORT:", process.env.MYSQLPORT);
    console.log("DB:", process.env.MYSQLDATABASE);
});

module.exports = db;