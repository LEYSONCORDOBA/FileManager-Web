'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { routes, middlewares } = require('../api');

module.exports = ({ app }) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(fileUpload());
  app.use('', middlewares.auth.isAuthentication, routes);
};
