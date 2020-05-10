'use strict';

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

module.exports = (mongoose, server) => {
    const Schema = mongoose.Schema;
    const fsPromise = fs.promises;
    const models = {};
    const pathToSchema = path.join(__dirname, '../schemas/mongo');
    return fsPromise.readdir(pathToSchema).then(async schemas => {
        let filePattern = '.json';
        schemas = schemas.filter(s => s.endsWith(filePattern));
        await Promise.map(schemas, async  (schema) =>{
            let schemaName = schema.split(filePattern)[0];
            return fsPromise.readFile(path.join(pathToSchema, schema), 'utf-8')
                    .then(data => {
                        data = JSON.parse(data);
                        models[schemaName] = mongoose.model(schemaName, new Schema(data));
                    });
        });
        server['models'] = models;
        return server;
    })
}