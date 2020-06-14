const winston = require('winston');
/* istanbul ignore next */
module.exports = (err, req, res, next) => {
  //ERROR HANDLING
  /**
   * Define error-handling middleware functions in the same way as other middleware functions, 
   * except with four arguments instead of three, 
   * specifically with the signature (err, req, res, next)):
   */
  if (!err) return next();
  
  winston.error(err.message);
  // Handle json error and send a message
  if (err instanceof SyntaxError) {
    res.status('400').send({
      code: 4,
      msg: "Request body must be in valid JSON format. Error is ;" + err.message,
      records: []
    })
  } else {
    res.status(500).send({
      code: -1,
      msg: err.message,
      records: []
    });
  }
};
