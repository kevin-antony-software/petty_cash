const express = require('express');
const router = express.Router();
const cash = require('../controllers/cash');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCash } = require('../middleware');

const Cash = require('../models/cash');

router.route('/')
    .get(catchAsync(cash.index))
    .post(isLoggedIn, validateCash, catchAsync(cash.createCash))

router.get('/new', isLoggedIn, cash.renderNewForm)

router.route('/:id')
    .put(isLoggedIn, validateCash, catchAsync(cash.updateCash))
    .delete(isLoggedIn, catchAsync(cash.deleteCash));

router.get('/:id/edit', isLoggedIn, catchAsync(cash.renderEditForm))

module.exports = router;