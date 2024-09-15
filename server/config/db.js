const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "toor",
    database: "todo"
})

module.exports = db;