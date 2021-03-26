'use strict';
var fs = require('fs');
var utilsAuth = require('../../util/auth');

const permitRequest = ['/', '/user/login', '/user/singup'];

var MiddlewareAuth = {
  isAuthentication: (req, res, next) => {
    if (permitRequest.includes(req.originalUrl)) return next();

    if (req.headers.authorization) {
      var tokenRequest = req.headers.authorization.split(' ')[1];
      if (tokenRequest) {
        if (utilsAuth.verifyJwt(tokenRequest)) {
          return next();
        } else {
          res.status(500).json({ error: 'Not Authorized' });
        }
      } else {
        res.status(500).json({ error: 'Not Authorized' });
      }
    } else {
      res.status(500).json({ error: 'Not Authorized' });
    }
  }
};

module.exports = MiddlewareAuth;
