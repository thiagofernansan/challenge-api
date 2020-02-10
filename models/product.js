'use strict';

const mongoose = require('mongoose');
const scm = require('../schemas/product');

module.exports = mongoose.model('product', scm.schema);