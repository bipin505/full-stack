'use strict';

const routes = require('express').Router( {mergeParams: true} );

module.exports = (services, models) => {

    routes.get('/', require('./get')(services, models));

    return routes;
}