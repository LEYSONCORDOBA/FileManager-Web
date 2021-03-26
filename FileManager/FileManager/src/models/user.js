'use strict';

const mongoose = require('mongoose');
const { constants, crypt } = require('../util');

const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

var UserSchema = Schema({
  username: {
    type: String,
    require: [true, constants.validFieldRequired('Username')],
    index: { unique: true },
    minlength: [1, constants.validFieldLengthMin('Username', 1)],
    maxlength: [25, constants.validFieldLengthMax('Username', 25)]
  },
  email: {
    type: String,
    require: [true, constants.validFieldRequired('Email')],
    index: { unique: true },
    minlength: [1, constants.validFieldLengthMin('Email', 1)],
    maxlength: [25, constants.validFieldLengthMax('Email', 25)]
  },
  hashed_password: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    require: [true, constants.validFieldRequired('firstName')],
    index: { unique: false },
    minlength: [3, constants.validFieldLengthMin('firstName', 3)],
    maxlength: [15, constants.validFieldLengthMax('firstName', 15)]
  },
  secondName: {
    type: String,
    require: [false, constants.validFieldRequired('secondName')],
    index: { unique: false },
    minlength: [0, constants.validFieldLengthMin('secondName', 0)],
    maxlength: [15, constants.validFieldLengthMax('secondName', 15)]
  },
  firstSurName: {
    type: String,
    require: [true, constants.validFieldRequired('firsrSurName')],
    index: { unique: false },
    minlength: [2, constants.validFieldLengthMin('firsrSurName', 2)],
    maxlength: [20, constants.validFieldLengthMax('firsrSurName', 20)]
  },
  secondSurName: {
    type: String,
    require: [false, constants.validFieldRequired('secondSurName')],
    index: { unique: false },
    minlength: [2, constants.validFieldLengthMin('secondSurName', 2)],
    maxlength: [20, constants.validFieldLengthMax('secondSurName', 20)]
  },
  createDate: { type: Date, default: Date.now }
});

// Virtuals
UserSchema.virtual('password').set(function (password) {
  this._password = password;
});
UserSchema.virtual('fullName').get(
  () =>
    `${this.firstName} ${this.secondName || ''} ${this.firsrSurName} ${
      this.secondSurName || ''
    }`
);

UserSchema.pre('save', function (next) {
  // store reference
  const user = this;
  if (user._password === undefined) {
    return next();
  }
  user.hashed_password = crypt.hash(user._password);
  next();
});

/**
 * Methods
 */
UserSchema.methods = {
  comparePassword: function (candidatePassword) {
    return crypt.compareHash(candidatePassword, this.hashed_password);
  }
};

module.exports = mongoose.model('User', UserSchema);
