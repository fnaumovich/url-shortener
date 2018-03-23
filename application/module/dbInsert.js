const CONFIG = require('../config');

function insertToDatabase(shortUrl, url) {
    return `INSERT INTO ${CONFIG.table} (short_url, url) VALUES ("${shortUrl}", "${url}")`;
}

module.exports = insertToDatabase;
