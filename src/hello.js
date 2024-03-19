/*const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'awsmysql.czywkesuu5ce.us-east-1.rds.amazonaws.com',
    port: '3306',
    database: 'MySplunkApp',
    user: 'admin',
    password: 'Stella6797',
});

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        // Connect to the database
        db.connect((connectErr) => {
            if (connectErr) {
                reject({
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Database connection error' }),
                });
                return;
            }

            // Query the reports table
            db.query('SELECT * FROM reports', (queryErr, results) => {
                if (queryErr) {
                    reject({
                        statusCode: 500,
                        body: JSON.stringify({ error: 'Query error' }),
                    });
                } else {
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify(results),
                    });
                }
            });
        });
    });
};*/

/*const pool = require('../db');

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        // Acquire a connection from the pool
        pool.getConnection((err, connection) => {
            if (err) {
                // Handle connection error
                reject({
                    statusCode: 500,
                    headers: {
                        "Access-Control-Allow-Headers": "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "OPTIONS,GET"
                    },
                    body: JSON.stringify({ error: 'Database connection error' }),
                });
                return;
            }

            // Query the database using the acquired connection
            connection.query('SELECT * FROM reports', (queryErr, results) => {
                // Release the connection back to the pool
                connection.release();

                if (queryErr) {
                    // Handle query error
                    reject({
                        statusCode: 500,
                        headers: {
                            "Access-Control-Allow-Headers": "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "OPTIONS,GET"
                        },
                        body: JSON.stringify({ error: 'Query error' }),
                    });
                } else {
                    // Resolve with the query results
                    resolve({
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Headers": "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "OPTIONS,GET"
                        },
                        body: JSON.stringify(results),
                    });
                }
            });
        });
    });
};*/

const pool = require('../db');

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        // Acquire a connection from the pool
        pool.getConnection((err, connection) => {
            if (err) {
                // Handle connection error
                reject({
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Database connection error' }),
                });
                return;
            }

            // Query the database using the acquired connection
            connection.query('SELECT * FROM reports', (queryErr, results) => {
                // Release the connection back to the pool
                connection.release();

                if (queryErr) {
                    // Handle query error
                    reject({
                        statusCode: 500,
                        body: JSON.stringify({ error: 'Query error' }),
                    });
                } else {
                    // Resolve with the query results
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify(results),
                    });
                }
            });
        });
    });
};