/**
 * RecordModel.js
 *
 */
const DBAdapter = require('../../datastore/db-adapter');

class RecordModel {
  static async getRecords(startDate, endDate, minCount, maxCount) {
    if (!startDate || !endDate || !minCount || !maxCount) {
      throw new Error("Required params are not provided!");
    }
    return await DBAdapter.GET_RECORDS(startDate, endDate, minCount, maxCount);
  }
};

module.exports = RecordModel;