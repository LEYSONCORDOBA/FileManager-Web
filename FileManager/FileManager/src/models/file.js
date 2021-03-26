'use strict';
const mongoose = require('mongoose');
const { constants } = require('../util');
const Schema = mongoose.Schema;

var fileSchema = Schema({
  name: {
    type: String,
    require: [true, constants.validFieldRequired('name file')],
    index: { unique: false },
    minlength: [1, constants.validFieldLengthMin('name file', 1)],
    maxlength: [100, constants.validFieldLengthMax('name file', 100)]
  },
  URL: {
    type: String,
    default: ''
  },
  isPublic: {
    type: Boolean,
    require: [false],
    index: { unique: false },
    default: false
  },
  password: {
    type: String,
    require: [false, constants.validFieldRequired('secondSurName')],
    index: { unique: false },
    minlength: [2, constants.validFieldLengthMin('secondSurName', 2)],
    maxlength: [20, constants.validFieldLengthMax('secondSurName', 20)]
  },
  tag_id: {
    type: Schema.ObjectId,
    require: [false, constants.validFieldRequired('Tag_id')],
    ref: 'Tag'
  },
  user_id: {
    type: Schema.ObjectId,
    require: [true, constants.validFieldRequired('User_id')],
    ref: 'User'
  }
});

// fileSchema.pre('save', function (next) {
//   const _file = this;
//   _file.URL = '';
// });

module.exports = mongoose.model('File', fileSchema);
