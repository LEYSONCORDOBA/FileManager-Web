'use strict';
const Log = require('./logger');

const Constants = {
  //Api Response Format
  responseFormat: (
    statusCode = undefined,
    Description = '',
    Data = undefined
  ) => {
    return { statusCode: statusCode, Description: Description, Data: Data };
  },

  //Api Response Format  Login jwt
  responseFormatLogin: token => {
    if (token) {
      return { login: 'Success', token };
    } else {
      return { login: 'Failed', error: 'Wrong user or password' };
    }
  },
  //Start:Validation Messages
  validErrorGenerate: (accion, field, error) => {
    //if the error returned is by trying to add an existing record,
    // we show a simpler error
    if (error.code == 11000) {
      return Constants.responseFormat(
        400,
        accion,
        `The ${field} already exists`
      );
    } else {
      return Constants.responseFormat(400, accion, [error.message]);
    }
  },

  validFieldRequired: field => `The ${field} is required`,

  validFieldExists: field => `The ${field} already exists`,

  validFieldLengthMin: (field, length) =>
    `The ${field} must be a minimum of ${length} characters`,

  validFieldLengthMax: (field, length) =>
    `The ${field} must be a maximum of ${length} characters`,
  //End:Validation Messages

  //Start: Action Response
  saveSuccess: accion => `${accion} saved successfully`,
  removeSuccess: accion => `${accion} remove successfully`,
  updateSuccess: accion => `${accion} update successfully`,
  passwordIncorrect: _ => 'Password or Username Incorrect',
  tokenExpired: _ => `Token expired`,
  tokenNotFound: _ => `Token not found`,
  //End: Action Response

  CheckNull: (res, element, name) => {
    if (!element) {
      res
        .status(400)
        .send({
          statusCode: 400,
          Description: `The field ${name} cannot be null`
        });
      return true;
    }
    return false;
  },
  throwException: (message, model) => {
    Log.error(e.message);
    throw new Error({ message, model });
  }
};

module.exports = Constants;
