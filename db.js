var mysql = require('mysql');
const { db } = require('./config.json');

class DB {
    static connection = null;

    // Connect to the database.
    static connect() {
        this.connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL || db);

        this.connection.connect();
    }

    // Disconnect from the database.
    static disconnect() {
        this.connection.end();
    }

    // Queries the db.
    //
    // Callback should be of the form `function(rows, fields)`.
    static query(query, callback) {
        this.connection.query(query, function(err, rows, fields) {
            if (err) {
                console.log(err);

                return;
            }

            return callback(rows, fields);
        });
    }
}

module.exports = {
    DB
}