/**
 * This file is used for adding an abstraction layer between database and models
 * By this way, we can change our database structure or we can even use different database engine 
 * without changing any model,controller or any part of code in the project.
 */

const mongoose = require('mongoose');
const moment = require('moment');

class Adapter {
  constructor() {
    const recordsSchema = new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      key: String,
      value: String,
      count: [Number],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });
    this.recordSchema = mongoose.model('Records', recordsSchema);
  }

  /**
   * Get records command
   * @param {*} tableName 
   */
  async GET_RECORDS(startDate, endDate, minCount, maxCount) {
    return await this.recordSchema.aggregate([
      {
        $project: {
          _id: false,
          key: true,
          createdAt: true,
          totalCount: { $sum: "$counts"}
        },          
      },
      { 
        $match: {
          totalCount: { $gte: parseInt(minCount), $lte: parseInt(maxCount) },
          createdAt: {
            $gte: moment(startDate, 'YYYY-MM-DD').add(1, 'day').toDate(),
            $lte: moment(endDate, 'YYYY-MM-DD').add(1, 'day').toDate()
          }
        }
      },
    ]);
  }
}

module.exports = new Adapter();