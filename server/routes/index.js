'use strict';

const routes = require('express').Router( {mergeParams: true} );

module.exports = (services, models) => {
    
    routes.use('/healthcheck', require('./healthcheck')(services, models));

    routes.use('/meta', require('./meta')(services, models));

    routes.use('/crawler', require('./crawler')(services, models));

    return routes;
}
