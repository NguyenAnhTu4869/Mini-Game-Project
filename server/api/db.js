'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "mini_game"
});

db.connect(function(err, connection) {
    if(err) console.log("Can't connect SQL")
})

module.exports = db