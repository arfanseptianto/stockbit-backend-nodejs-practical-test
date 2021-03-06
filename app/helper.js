const config = require('../config/config');
const moment = require('moment');
const util = require('util');
const db = require('../config/database');

module.exports.output = (req, res, status_code, err, data) => {
    var temp = JSON.stringify(data);

    var appName = config.name || process.env.name || '';
    var shortUrl = req.baseUrl + req.route.path;
    var request = JSON.stringify(req.query.apikey ? req.query : req.body);
    var startTime = moment(req.start).format('YYYY-MM-DD HH:mm:ss');
    var elapsedTime = moment.duration(moment().diff(startTime)).as('milliseconds') + 'ms';

    if (temp.length > 200)
        temp = temp.substr(0, 200);

    if (process.env.NODE_ENV != 'testing') {
        if (!err) {
            console.log('\x1b[32m%s\x1b[0m', appName + ' | ' + shortUrl + ' (' + elapsedTime + ') | ' + request + ' | ' + temp);
        } else {
            console.error('\x1b[31m%s\x1b[0m', appName + ' | ' + shortUrl + ' (' + elapsedTime + ') | ' + request + ' | ' + JSON.stringify(err) + ' | ' + temp);
        }
        log_request(shortUrl, request, temp);
    }

    res.status(status_code).json(data).send();
};

module.exports.validate_api_key = (req, res, next) => {
    const apikey = req.body.apikey || req.query.apikey;

    if (!apikey)
        return res.status(403).json({ Response: 'False', Error: "An apikey is required for authentication" }).send();

    return next();
};

async function log_request(endpoint, parameters, response) {
    try {
        let conn = await db.getConnection()
        let sql_query = 'INSERT INTO logs (endpoint, parameters, response) VALUES (:endpoint, :parameters, :response);'
        let sql_param = { endpoint, parameters, response }
        await conn.execute(sql_query, sql_param)
        conn.release();
    }
    catch (err) {
        console.error('\x1b[41m%s\x1b[0m', util.inspect(err, false, null));
    }
}

module.exports.error = (value) => {
    if (process.env.NODE_ENV == 'testing')
        return false;
    console.error('\x1b[41m%s\x1b[0m', util.inspect(value, false, null));
};

module.exports.log = (value) => {
    if (process.env.NODE_ENV == 'testing')
        return false;
    console.log('\x1b[32m%s\x1b[0m', util.inspect(value, false, null));
};

module.exports.info = (value) => {
    if (process.env.NODE_ENV == 'testing')
        return false;
    console.log('\x1b[33m%s\x1b[0m', util.inspect(value, false, null));
};
