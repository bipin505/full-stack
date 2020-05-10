'use strict';

module.exports = (services, models) => {
    return (req, res, next) => {
        try {
            if (Object.keys(services).length > 0) {
                res.status(200).send({
                    status: 'Ok'
                })
            } else {
                res.status(200).send({
                    status: 'Not ok'
                })
            }
        } catch (error) {
            next(error);
        }
    }
}