const pool = require('../db');

exports.handler = async (event) => {
    try {
        console.log("event", event)
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
                body: JSON.stringify({ error: 'No fields to update provided' }),
            };
        }

        console.log("this is the report id", report_id)

        // Execute SQL update query
        const updateQuery = `UPDATE reports SET ${updateFields.join(', ')} WHERE id = ?`;
        const updateParams = [...updateValues, report_id];

        console.log("before promise...", updateQuery, updateParams)
        return new Promise((resolve, reject) => {
            // Acquire a connection from the pool
            console.log("before pool get connection", updateQuery, updateParams)
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log("inside if connection error", )
                    // Handle connection error
                    reject(JSON.stringify("DB connection error.", err));
                    return;
                }

                // Execute the update query using the acquired connection
                connection.query(updateQuery, updateParams, (queryErr, results) => {
                    // Release the connection back to the pool
                    connection.release();
                    console.log("after connection query")
                    if (queryErr) {
                        console.log("inside if", queryErr)
                        // Handle query error
                        reject(JSON.stringify("Update error", err));
                    } else {
                        console.log("inside else")
                        // Resolve with success message
                        resolve({
                            statusCode: 200,
                            body: JSON.stringify({ message: 'Update successful' }),
                        });
                    }
                });
            });
        });
    } catch (error) {
        console.log("inside catch", error.message);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Headers": "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,PUT"
            },
            body: JSON.stringify(error),
        };
    }
};
