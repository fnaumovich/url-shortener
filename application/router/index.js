const express = require('express');
const router = express.Router();
const METHODS = require('../module');
const dbInsert = require('../module/dbInsert');
const dbSelect = require('../module/dbSelect');
const dbSelectAll = require('../module/dbSelectAll');
const Database = require('../common/db');
const database = new Database();

router.get('/shorten', async (req, res) => {
    const url = req.query.url;
    const sqlUrls = dbSelectAll();
    
    if (url.length === 0) {
        res.send({ success: 0, value: 'Sting is empty' });
    } 
    
    else {
        try {
            const result = await database.query(sqlUrls);
            const filteredResult = result.filter(item => {
                return item.url === url;
            });

            if (filteredResult.length) {
                res.send({ success: 1, value: filteredResult[0].short_url });
            } 
            
            else {
                const shortUrl = METHODS.generateUID();
                const sql = dbInsert(shortUrl, url);
                await database.query(sql);
                res.send({ success: 1, value: shortUrl });
            }
        } catch(err) {
            throw new Error(err);
        }
    }
});

router.get('/:encoded_url', async (req, res) => {
    let shortUrl = req.url;
    shortUrl = shortUrl.replace('\/', '');
    const sql = dbSelect(shortUrl);

    try {
        const result = await database.query(sql);

        if (Array.isArray(result) && result.length) {
            res.redirect(result[0].url);
        } else {
            res.redirect('/');
        }
    } catch (err) {
        throw new Error(err);
    }
});

router.all('*', (req, res) => res.status(404).send('wrong way'));

module.exports = router;
