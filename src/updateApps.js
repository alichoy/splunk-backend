const pool = require('../db');

exports.handler = async (event) => {
    const { app_id } = event.pathParameters;
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

    // Execute SQL update query
    const updateQuery = `UPDATE apps SET ${updateFields.join(', ')} WHERE id = ?`;
    const updateParams = [...updateValues, app_id];

    
    return new Promise((resolve, reject) => {
        // Execute the update query using the acquired connection from the pool
        pool.getConnection((err, connection) => {
            if (err) {
                // Handle connection error
                reject(JSON.stringify("DB connection error.", err));
                return;
            }

            // Execute the update query using the acquired connection
            connection.query(updateQuery, updateParams, (queryErr, results) => {
                // Release the connection back to the pool
                connection.release();

                if (queryErr) {
                    // Handle query error
                    reject(JSON.stringify("Update error", err));
                } else {
                    // Resolve with success message
                    resolve({
                        statusCode: 201,
                        body: JSON.stringify({ message: 'Update successful' }),
                    });
                }
            });
        });
    });
};
