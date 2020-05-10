'use strict';

const routes = require('express').Router( {mergeParams: true} );

module.exports = (services, models) => {
    
    routes.post('/', require('./post')(services, models));

    return routes;
}