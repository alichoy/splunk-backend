const pool = require('../db');

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        // Acquire a connection from the pool
        pool.getConnection((err, connection) => {
            if (err) {
                // Handle connection error
                reject(JSON.stringify("DB connection error.", err));
                return;
            }

            // Execute the query using the acquired connection
            connection.query('SELECT * FROM alerts', (queryErr, results) => {
                // Release the connection back to the pool
                connection.release();

                if (queryErr) {
                    // Handle query error
                    reject(JSON.stringify("Query error", err))
                } else {
                    // Resolve with success response
                    resolve({
                        statusCode: 200,
                        body: JSON.stringify(results),
                    });
                }
            });
        });
    });
};
