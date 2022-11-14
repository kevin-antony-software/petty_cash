const express = require('express');
const router = express.Router();
const cash = require('../controllers/cash');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCash } = require('../middleware');

const Cash = require('../models/cash');

router.route('/')
    .get(catchAsync(cash.index))
    //.post(isLoggedIn, validateCash, catchAsync(cash.createCash))
    
    .post(catchAsync(cash.inCash));

router.route('/outCash').post(catchAsync(cash.outCash));
router.get('/inCash', cash.renderNewForm);
router.get('/outCash', cash.renderNewOutForm);
// router.post('/outCash', catchAsync(cash.inCash));


module.exports = router;