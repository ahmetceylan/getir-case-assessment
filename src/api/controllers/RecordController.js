
const winston = require('winston');
const RecordModel = require('../models/RecordModel');

module.exports = class RecordController {
  static async getRecords(req, res) {
    try {
      const {
        startDate,
        endDate,
        minCount,
        maxCount
      } = req.body;
      const records = await RecordModel.getRecords(startDate, endDate, minCount, maxCount);

      if (!records.length) {
        res.status(404);
        return res.send({code: 1, msg: 'Can not find any record with given parameters!', records});
      }
      res.status(200);
      res.send({code: 0, msg: 'Success', records});
    }
    catch (err) { 
      winston.error(err.message);
      res.status(500);
      res.send({ code: -1, msg: "internal server error, error is ; " + err.message, records: []});  
    }
  }
};