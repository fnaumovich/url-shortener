const express = require('express');
const router = express.Router();
const database = require('../common/db');

router.get('/shorten', async (req, res) => {
    const regexpHyperlinkHttp = /https?:\/\/(((?:[-\w]+\.)?([-\w]+)\.\w+)|(localhost))(?:\.\w+)?\/?.*/ig;
    let url = req.query.url;

    url = url.startsWith('http') ? url : `http://${url}`;

    if (url.match(regexpHyperlinkHttp)) {
        if (url.length === 0) {
            res.send({ success: 0, value: 'Sting is empty' });
        }

        else {
            try {
                const result = await database.findByUrl(url);

                if (result.length) {
                    res.send({ success: 1, value: result[0].short_url });
                }

                else {
                    const shortUrl = await database.saveShortUrl(url);
                    res.send({ success: 1, value: shortUrl });
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    } else {
        res.send({ success: 0, value: 'Введен некорректный адрес' });
    }
});

router.get('/:encoded_url', async (req, res) => {
    let shortUrl = req.url;
    shortUrl = shortUrl.replace('\/', '');

    try {
        const result = await database.findByShortUrl(shortUrl);

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
