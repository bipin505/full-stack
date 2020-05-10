'use strict';

const express = require('express');
const logger = require('morgan');
const dependencyInitializer = require('./helpers/dependency-initializer');
const errorHandler = require('./helpers/error-handler');
const attachHeaders = require('./helpers/attachResponseHeaders');
const path = require('path');
const app = express();
const routes = require('./routes/index');
const socket = require('./socket/index');
const http = require('http');
const server = http.createServer(app);

class App {
  constructor() {
    this.initialize();
  }

  initialize() {
    dependencyInitializer().then((dependencies) => {
      app.use(logger('dev'));
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
    
      // Static Files
      app.use(express.static(path.join(__dirname, './public'), {
        setHeaders: (res, path, stat) => {
          let result = attachHeaders(dependencies.config);
          for(let i in result) {
            res.setHeader(i, result[i])
          }
        }
      }))
      // Route Initialization
      app.use('/api/v1/', routes(dependencies.config, dependencies.models));
    
      // Socket Initialization
      socket(server, dependencies.models);
      
      // error handler
      app.use(errorHandler({
        detailed: dependencies.config.environment !== 'production'
      }));
      if(module === require.main) {
        server.listen(dependencies.config.port, () =>{
          console.log(`Environment: ${dependencies.config.environment}`);
          console.log(`App is running on port: ${dependencies.config.port}`);
        });
      }
    })
  }
}

module.exports = new App();