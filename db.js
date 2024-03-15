const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // Adjust this limit based on your needs
    host: 'awsmysql.czywkesuu5ce.us-east-1.rds.amazonaws.com',
    port: '3306',
    database: 'MySplunkApp',
    user: 'admin',
    password: 'Stella6797',
});

module.exports = pool;
