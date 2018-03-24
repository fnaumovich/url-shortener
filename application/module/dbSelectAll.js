const CONFIG = require('../config');

function selectFromDataBase() {
    return `SELECT * FROM ${CONFIG.table}`;
}

module.exports = selectFromDataBase;
