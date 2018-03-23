const mySQL = require('mysql');
const CONFIG = require('../config');

const connection = mySQL.createConnection(CONFIG.sqlParams);
connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;
