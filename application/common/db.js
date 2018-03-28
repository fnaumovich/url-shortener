const mySQL = require('mysql');
const CONFIG = require('../config');
const METHODS = require('../module');

class Database {
    constructor() {
        this.connection = mySQL.createConnection(CONFIG.database.connection);
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
    saveShortUrl(url) {
        const uid = METHODS.generateUID();
        const query = `INSERT INTO ${CONFIG.database.table} (short_url, url) VALUES (?, ?)`;
        this.query(query, [uid, url]);

        return uid;
    }
    findByShortUrl(shortUrl) {
        const query = `SELECT * FROM ${CONFIG.database.table} WHERE short_url = ?`;

        return this.query(query, shortUrl);
    }
    findByUrl(url) {
        const query = `SELECT * FROM ${CONFIG.database.table} WHERE url = ?`;

        return this.query(query, url);
    }
}

module.exports = new Database();
