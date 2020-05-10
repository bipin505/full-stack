'use strict';

const attachHeaders = require('../../helpers/attachResponseHeaders');

module.exports = (services, models) => {
    return (req, res, next) => {
        try {
            res.status(200).send(attachHeaders(services))
        } catch (error) {
            next(error);
        }
    }
}