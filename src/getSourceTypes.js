const pool = require('../db');

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

            // Execute the query using the acquired connection
            connection.query('SELECT * FROM source_types', (queryErr, results) => {
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
                    // Resolve with success response
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
};