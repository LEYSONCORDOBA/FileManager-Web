'use strict';

const { file } = require('../../services');
const { constants } = require('../../util');
const logger = require('../../util/logger');
const express = require('express');
const auth = require('../../util/auth');
const router = express.Router();

module.exports = app => {
  app.use('/file', router);

  router.get('/list', async (req, res) => {
    try {
      const data = await file.Get(req.headers.authorization);
      res.send(constants.responseFormat(200, 'File', data));
    } catch (err) {
      res
        .status(400)
        .send(constants.responseFormat(400, 'File', [err.message]));
      logger.error(err.message);
    }
  });
  router.post('/upload', async (req, res) => {
    try {
      let newFile = req.files.file;
      const data = await file.Upload({
        newFile,
        authorization: req.headers.authorization
      });
      if (data) res.send(constants.responseFormat(200, 'File', data));
      else
        res
          .status(500)
          .send(
            constants.responseFormat(500, 'File', 'File could not be uploaded')
          );
    } catch (err) {
      res
        .status(400)
        .send(constants.responseFormat(400, 'File', [err.message]));
    }
  });
};
