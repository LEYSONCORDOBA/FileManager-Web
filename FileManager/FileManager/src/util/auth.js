'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
const log = require('./logger');
const privateKey = fs.readFileSync('src/util/private.pem', 'utf8');

const authAction = {
  signJWT: (payload, algorithm = 'HS256') => {
    if (!privateKey) log.info('The PrivateKey is required');
    return jwt.sign(payload, privateKey, { algorithm: algorithm }); //return jwt
  },

  verifyJwt: (token, algorithm = 'HS256') => {
    //Bearer dasnnas
    var validated = false;
    if (!token) {
      log.info('The PrivateKey is required');
      return validated;
    }
    jwt.verify(token, privateKey, { algorithm: algorithm }, (err, suc) => {
      if (suc) validated = suc.id_user;
    });
    return validated;
  },
  getIdJwt: (token, algorithm = 'HS256') => {
    //Bearer dasnnas
    var validated = false;
    if (!token) {
      log.info('The PrivateKey is required');
      return validated;
    }
    jwt.verify(token, privateKey, { algorithm: algorithm }, (err, suc) => {
      validated = suc.id_user;
    });
    return validated;
  }
};

module.exports = authAction;
