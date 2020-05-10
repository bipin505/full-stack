'use strict';

const mongoose = require('mongoose');
const mondelGenerator = require('./model-generator');

module.exports = (server) => {
    let config = server.config;
    let url = `mongodb://${config.database.mongo.user}:${config.database.mongo.password}@${config.database.mongo.host}:${config.database.mongo.port}/${config.database.mongo.database}`
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => mondelGenerator(mongoose, server))
        .catch(err => {throw err});
}