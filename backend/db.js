const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shopdb"
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("MySQL Connected");
});

module.exports = connection;