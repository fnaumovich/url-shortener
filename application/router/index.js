const express = require('express');
const router = express.Router();
const database = require('../common/db');
const ValidationException = require('../common/error').ValidationException;
const DbException = require('../common/error').DbException;

router.get('/shorten', async (req, res, next) => {
    const regexpHyperlinkHttp = /https?:\/\/(((?:[-\w]+\.)?([-\w]+)\.\w+)|(localhost))(?:\.\w+)?\/?.*/ig;
    let url = req.query.url;

    // проверка на пустую строку
    if (!url || (url && !url.trim().length === 0)) {
        return next(new ValidationException(['Поле url обязательное для заполнения']));
    }

    url = url.startsWith('http') ? url : `http://${url}`;

    // проверка на http://
    if (!url.match(regexpHyperlinkHttp)) {
        return next(new ValidationException(['Введен некорректный адрес']));
    }

    try {
        let resultUrl = '';
        const result = await database.findByUrl(url);

        if (result.length) {
            resultUrl = result[0].short_url;
        }
        else {
            resultUrl = await database.saveShortUrl(url);
        }
        res.send({ success: 1, value: resultUrl });
    }

    catch(err) {
        return next(new DbException);
    }
});

router.get('/:encoded_url', async (req, res, next) => {
    let shortUrl = req.url;
    shortUrl = shortUrl.replace('\/', '');

    try {
        let resultUrl = '';
        const result = await database.findByShortUrl(shortUrl);

        if (Array.isArray(result) && result.length) {
            resultUrl = result[0].url;
        } else {
            resultUrl = '/';
        }

        res.redirect(resultUrl);
    } catch (err) {
        return next(new DbException);
    }
});

router.all('*', (req, res) => res.status(404).send('wrong way'));

module.exports = router;
