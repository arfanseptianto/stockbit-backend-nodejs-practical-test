const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config/config');
const { output, log, info, error: err } = require('./helper');

router.get('/search', async function (req, res) {
    try {
        const { apikey, s, type, y, r, page, callback, v } = req.query.s ? req.query : req.body;
        if (!s)
            throw { code: '403', message: 'Please provide keywords to search' };

        const params = { apikey, s, type, y, r, page, callback, v };
        const result = await search_omdb(params);
        if (result.data && result.data.Response == 'False')
            throw { code: result.data.Code, message: result.data.Error };

        output(req, res, 200, null, result)
    }
    catch (error) {
        err(error)
        output(req, res, (error.sql ? 500 : error.code || 500), error, { Response: false, error: error.message || error })
    }
})

router.get('/detail', async function (req, res) {
    try {
        const { apikey, i, t, type, y, plot, r, callback, v } = req.query.s ? req.query : req.body;
        if (!(i || t))
            throw { code: '403', message: 'Please provide valid IMDb ID or movie title to view the detail' };

        const params = { apikey, i, t, type, y, plot, r, callback, v };
        const result = await search_omdb(params);
        if (result.data && result.data.Response == 'False')
            throw { code: result.data.Code, message: result.data.Error };

        output(req, res, 200, null, result)
    }
    catch (error) {
        err(error)
        output(req, res, (error.sql ? 500 : error.code || 500), error, { Response: false, error: error.message || error })
    }
})

async function search_omdb(params) {
    const query = Object.keys(params).filter(key => !!params[key]).map(key => key + '=' + params[key]).join('&');
    const api_url = config.api_url + '?' + query;

    return axios.get(api_url)
        .then(resp => resp.data)
        .catch((error) => {
            error.response.data.Code = error.response.status;
            return error.response;
        });
}

module.exports = router
