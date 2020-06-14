const winston = require('winston');
const mongoose = require('mongoose');

module.exports = () => {
  const db = process.env.MONGO_DB_URL || 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';
  mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    winston.info(`Connected to ${db}...`);
  })
  .catch((err) => {
    winston.error(err.message);
  });
};
