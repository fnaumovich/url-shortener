const express = require('express');
const router = express.Router();
const METHODS = require('../module');
const mySQL = require('mysql');

const mySQLParams = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'url_shortener'
};
const connection = mySQL.createConnection(mySQLParams);
connection.connect(function (err) {
    if (err) throw err;
});

router.get('/test', (req, res) => {
    console.log(req.query.url);

    const response = req.query;
    const shortUrl = METHODS.generateUID();
    const url = response.url;

    const table = 'urls';
    const sql = `INSERT INTO ${table} (short_url, url) VALUES ("${shortUrl}", "${url}")`;

    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log('INSERTED!!!');
    });

    res.send('hello');
});

router.all('*', (req, res) => res.status(404).send('wrong way'));

module.exports = router;
