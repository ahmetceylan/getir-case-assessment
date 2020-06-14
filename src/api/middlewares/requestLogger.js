const winston = require('winston');

module.exports = (req, res, next) => {
  //Logging purpose
  // a middleware function with no mount path. This code is executed for every request to the router
  winston.info('Request:' + req.originalUrl + ' Time: ' + new Date());
  next();
};
