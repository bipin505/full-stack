'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = (services, models) => {
    return async (req, res, next) => {
        try {
           let crawlingPage = await rp({
               uri: req.body.url,
               method: 'GET',
               json: true
           });
           return res.status(200).send(crawlingPage);
        } catch (error) {
            next(error);
        }
    }
}