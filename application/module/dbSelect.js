const CONFIG = require('../config');

function selectFromDataBase(shortUrl) {
    return `SELECT * FROM ${CONFIG.table} WHERE short_url = "${shortUrl}"`;
}

module.exports = selectFromDataBase;