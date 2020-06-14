const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const errorMiddleware = require('../middlewares/error');
const requestLogger = require('../middlewares/requestLogger');
const notFound = require('../middlewares/notFound');

module.exports = (app) => {
  initMiddlewares(app);
  initApplicationRoutes(app);
  initCustomMiddlewares(app);
};

/**
 * Adds express middlewares
 * @param {*} app 
 */
function initMiddlewares(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  // Helmet helps us secure our Express apps by setting various HTTP headers
  app.use(helmet()); 
  
  // Rate Limiter
  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html
  // app.set('trust proxy', 1);
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
}

/**
 * Adds application routes
 * @param {*} app 
 */
function initApplicationRoutes(app) {
  app.use('/api', require('./routes/record'));
}

/**
 * Adds custom middlewares for logging and error handling
 * @param {*} app 
 */
function initCustomMiddlewares(app) {
  // Custom Middlewares
  app.use(errorMiddleware);
  app.use(requestLogger);
  app.use(notFound);
}