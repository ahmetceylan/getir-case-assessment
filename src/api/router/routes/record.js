var express = require('express');
const validate = require('../../helpers/validate');
var router = express.Router();

/**
 * CONTROLLER
 */
const RecordController = require('../../controllers/RecordController');

/**
 * ROUTES
 */
router.post('/getRecords', [validate], RecordController.getRecords);

module.exports = router;