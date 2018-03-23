const express = require('express');
const router = express.Router();
const METHODS = require('../module');
const dbInsert = require('../module/dbInsert');
const dbSelect = require('../module/dbSelect');
const connection = require('../common/db');

router.get('/test', (req, res) => {
    const response = req.query;
    const shortUrl = METHODS.generateUID();
    const url = response.url;

    const sql = dbInsert(shortUrl, url);

    connection.query(sql, function (err, result) {
        if (err) throw err;
    });

    res.send('hello');
});

router.get('/:encoded_url', (req, res) => {
    let shortUrl = req.url;
    shortUrl = shortUrl.replace('\/', '');
    const sql = dbSelect(shortUrl);

    connection.query(sql, function (err, result) {
        if (err) throw err;

        if (Array.isArray(result) && result.length) {
            res.redirect(result[0].url);
        } else {
            res.redirect('/');
        }
    });
});

router.all('*', (req, res) => res.status(404).send('wrong way'));

module.exports = router;
