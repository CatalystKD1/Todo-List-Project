require('dotenv').config();
const mysql = require('mysql2')

console.log("DB_HOST:", process.env.DB_HOST);  // ✅ Debugging
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "*****" : "NOT SET");
console.log("DB_NAME:", process.env.DB_NAME);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect (err => {
    if (err) throw err;
    console.log("Connected to MySQL databse!");
});


// export as module
module.exports = connection;
