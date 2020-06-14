module.exports = (req, res, next) => {
  // catch 404 and forward to error handler
  return res.status(404).json({
    code: 5,
    msg: 'Not Found'
  });
};