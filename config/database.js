const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "6294862",
    database: "task-manager-db"
});