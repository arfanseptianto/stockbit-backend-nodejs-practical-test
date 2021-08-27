const express = require('express');
const http = require("http");
const config = require('./config/config');
const { log, validate_api_key } = require('./app/helper');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-token,application-id,module-id');
    res.setHeader("Content-Type", "application/json");

    next();
});

const server = http.Server(app);

server.listen(config.port, () => {
    log(config.name + ' running on port ' + config.port);
});