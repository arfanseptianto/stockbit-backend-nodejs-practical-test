const config = require('../config/config');
const moment = require('moment');
const util = require('util');

module.exports.output = (req, res, status_code, err, data) => {
    var temp = JSON.stringify(data);

    var appName = config.name || process.env.name || '';
    var shortUrl = req.baseUrl + req.url;
    var request = JSON.stringify(req.body);
    var startTime = moment(req.start).format('YYYY-MM-DD HH:mm:ss');
    var elapsedTime = moment.duration(moment().diff(startTime)).as('milliseconds') + 'ms';

    if (temp.length > 200)
        temp = temp.substr(0, 200);

    if (!err) {
        console.log('\x1b[32m%s\x1b[0m', appName + ' | ' + shortUrl + ' (' + elapsedTime + ') | ' + request + ' | ' + temp);
    } else {
        console.error('\x1b[31m%s\x1b[0m', appName + ' | ' + shortUrl + ' (' + elapsedTime + ') | ' + request + ' | ' + JSON.stringify(err) + ' | ' + temp);
    }

    res.status(status_code).json(data).send();
};

module.exports.error = (value) => {
    console.error('\x1b[41m%s\x1b[0m', util.inspect(value, false, null));
};

module.exports.log = (value) => {
    console.log('\x1b[32m%s\x1b[0m', util.inspect(value, false, null));
};

module.exports.info = (value) => {
    console.log('\x1b[33m%s\x1b[0m', util.inspect(value, false, null));
};
