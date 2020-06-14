const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));
const winston = require('winston');

// Definition of validation schema 
const schema = Joi.object({
  startDate: Joi.date().format('YYYY-MM-DD').utc().required(),
  endDate: Joi.date().format('YYYY-MM-DD').utc().required(),
  minCount: Joi.number().integer().min(0).required(),
  maxCount: Joi.number().integer().min(0).required()
});

// Validate the incoming request model
module.exports = (req, res, next) => {
  var result = schema.validate(req.body);
  if (result.error) {
      var error = result.error.details[0];
      var code = -1;
      switch (error.type) {
          case 'any.empty':
          case 'any.required':
              code = 2
              break;
          case 'date.format':
              code = 3
              break;
          default:
              break;
      }
      winston.error(error.message);

      // Return error code and message
      res.status(400);
      return res.send({code, msg: error.message, records: []});
  } else {
      req.body = result.value
      next();
  }
};
