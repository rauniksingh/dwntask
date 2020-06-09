require('dotenv').config()
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    enviroment = process.env.NODE_ENV || 'Development',
    morgan = require('morgan'),
    mongoSanitize = require('express-mongo-sanitize'),
    cors = require('cors'),
    chalk = require('chalk'), 
    cluster = require('cluster'),
    helmet = require('helmet');

// Enviroment Setup
let envConfig

switch (enviroment) {
  case 'Development':
    envConfig = require('./config/local.json');
    break;

  case 'Staging':
    envConfig = require('./config/staging.json');
    break;

  case 'Production':
    envConfig = require('./config/prod.json');
    break;

  default:
    envConfig = require('./config/local.json');
    break;
};

module.exports = envConfig

// Config Server Port
if (!cluster.isMaster) {
  app.listen(envConfig.server.port, () => {
    console.log(chalk.blue(' [ ✓ ] Running on port : ' + envConfig.server.port))
  });
}

// MiddleWares
app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(require('express-request-id')())

// Routers Config
app.use(require('./routes/IndexRouter'))

// Dependencies
require('./Cluster')
require('./DataAdaptor/Mongo/Connection')
