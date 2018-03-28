const express = require('express');
const app = express();
const router = require('./application/router');
const CONFIG = require('./application/config');
const notFoundHandler = require('./application/common/error').notFoundHandler;
const exceptionHandler = require('./application/common/error').exceptionHandler;

app.use(express.static(__dirname + CONFIG.basePath));

app.use('/', router);
app.use(notFoundHandler);
app.use(exceptionHandler);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
