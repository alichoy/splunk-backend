const mysql = require('mysql');

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
            db.query('SELECT * FROM apps', (queryErr, results) => {

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
};
