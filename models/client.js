'use strict';

const mongoose = require('mongoose');
const scm = require('../schemas/client');

module.exports = mongoose.model('client', scm.schema);