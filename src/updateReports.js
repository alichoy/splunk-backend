/*const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'awsmysql.czywkesuu5ce.us-east-1.rds.amazonaws.com',
    port: '3306',
    database: 'MySplunkApp',
    user: 'admin',
    password: 'Stella6797',
});

exports.handler = async (event) => {
    const { report_id } = event.pathParameters;
    const requestData = JSON.parse(event.body);

    // Extract fields to update from request body
    const { meta_label_id, classification_id, category_id, disabled } = requestData;

    // Construct SQL update query based on provided fields
    const updateFields = [];
    const updateValues = [];

    if (meta_label_id !== undefined) {
        updateFields.push('meta_label_id = ?');
        updateValues.push(meta_label_id);
    }
    if (classification_id !== undefined) {
        updateFields.push('classification_id = ?');
        updateValues.push(classification_id);
    }
    if (category_id !== undefined) {
        updateFields.push('category_id = ?');
        updateValues.push(category_id);
    }
    if (disabled !== undefined) {
        updateFields.push('disabled = ?');
        updateValues.push(disabled);
    }

    if (updateFields.length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No fields to update provided' }),
        };
    }

    // Execute SQL update query
    const updateQuery = `UPDATE reports SET ${updateFields.join(', ')} WHERE report_id = ?`;
    const updateParams = [...updateValues, report_id];

    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) {
                reject({
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Database connection error' }),
                });
            } else {
                db.query(updateQuery, updateParams, (queryErr, results) => {

                    if (queryErr) {
                        reject({
                            statusCode: 500,
                            body: JSON.stringify({ error: 'Update error' }),
                        });
                    } else {
                        resolve({
                            statusCode: 200,
                            body: JSON.stringify({ message: 'Update successful' }),
                        });
                    }
                });
            }
        });
    });
};*/

const pool = require('../db');

exports.handler = async (event) => {
    const { report_id } = event.pathParameters;
    const requestData = JSON.parse(event.body);

    // Extract fields to update from request body
    const { meta_label_id, classification_id, category_id, disabled } = requestData;

    // Construct SQL update query based on provided fields
    const updateFields = [];
    const updateValues = [];

    if (meta_label_id !== undefined) {
        updateFields.push('meta_label_id = ?');
        updateValues.push(meta_label_id);
    }
    if (classification_id !== undefined) {
        updateFields.push('classification_id = ?');
        updateValues.push(classification_id);
    }
    if (category_id !== undefined) {
        updateFields.push('category_id = ?');
        updateValues.push(category_id);
    }
    if (disabled !== undefined) {
        updateFields.push('disabled = ?');
        updateValues.push(disabled);
    }

    if (updateFields.length === 0) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Headers": "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,GET"
            },
            body: JSON.stringify({ error: 'No fields to update provided' }),
        };
    }

    // Execute SQL update query
    const updateQuery = `UPDATE reports SET ${updateFields.join(', ')} WHERE report_id = ?`;
    const updateParams = [...updateValues, report_id];

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
                        "Access-Control-Allow-Methods": "OPTIONS,PUT"
                    },
                    body: JSON.stringify({ error: 'Database connection error' }),
                });
                return;
            }

            // Execute the update query using the acquired connection
            connection.query(updateQuery, updateParams, (queryErr, results) => {
                // Release the connection back to the pool
                connection.release();

                if (queryErr) {
                    // Handle query error
                    reject({
                        statusCode: 500,
                        headers: {
                            "Access-Control-Allow-Headers": "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "OPTIONS,PUT"
                        },
                        body: JSON.stringify({ error: 'Update error' }),
                    });
                } else {
                    // Resolve with success message
                    resolve({
                        statusCode: 200,
                        headers: {
                            "Access-Control-Allow-Headers": "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "OPTIONS,PUT"
                        },
                        body: JSON.stringify({ message: 'Update successful' }),
                    });
                }
            });
        });
    });
};