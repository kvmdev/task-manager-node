const { Pool } = require("pg");

module.exports = new Pool({
    host: "ep-super-lab-a5etzyxx.us-east-2.aws.neon.fl0.io",
    user: "fl0user",
    password: "KDgWYB1cuAP5",
    database: "task-manager-db",
    port: 5432
});