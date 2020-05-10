'use strict';

const path = require('path');
const fs = require('fs');
const mongoInitializer = require('./mongo-initializer');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = () => {
    return configLoader().then(server => mongoInitializer(server));
}

const configLoader = () => {
    return fs.promises.readFile(path.join(__dirname, `../config/config.${process.env.NODE_ENV}.json`), 'utf-8').then(
        config => {
            config = JSON.parse(config);
            config['environment'] = process.env.NODE_ENV;
            return { config };
        }
    ).catch(
        err=> {
            throw err;
        }
    )
}