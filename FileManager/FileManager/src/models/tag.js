'use strict';
const mongoose = require('mongoose');
const { constants } = require('../util');
const Schema = mongoose.Schema;
var tagSchema = Schema({
  name: {
    type: String,
    require: [true, constants.validFieldRequired('name')],
    index: { unique: false },
    minlength: [2, constants.validFieldLengthMin('name', 2)],
    maxlength: [20, constants.validFieldLengthMax('name', 20)]
  },
  user_id: {
    type: Schema.ObjectId,
    require: [true, constants.validFieldRequired('user_id')],
    ref: 'User'
  }
});
module.exports = mongoose.model('Tag', tagSchema);
