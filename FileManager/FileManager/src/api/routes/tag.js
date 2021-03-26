'use strict';

const { tag: tagService } = require('../../services');
const { constants, auth } = require('../../util');
const logger = require('../../util/logger');
const express = require('express');
const router = express.Router();

module.exports = app => {
  app.use('/tag', router);

  router.get('/', async (req, res) => {
    try {
      const data = await tagService.Get(req.query.query);
      res.send(constants.responseFormat(200, 'Tag', data));
    } catch (err) {
      res.status(400).send(constants.responseFormat(400, 'Tag', [err.message]));
      logger.error(err.message);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const user_id = auth.verifyJwt(req.headers.authorization.split(' ')[1]);
      const data = await tagService.Post({ ...req.body, user_id });
      res.send(constants.responseFormat(200, 'Tag', data));
    } catch (err) {
      res.status(400).send(constants.responseFormat(400, 'Tag', [err.message]));
      logger.error(err.message);
    }
  });

  router.put('/', async (req, res) => {
    try {
      await tagService.Put(req.query.id, req.body);
      res.send(
        constants.responseFormat('Tag', [constants.updateSuccess('Tag')])
      );
    } catch (err) {
      res.status(400).send(constants.responseFormat(400, 'Tag', [err.message]));
      logger.error(err.message);
    }
  });

  router.delete('/', async (req, res) => {
    try {
      const data = await tagService.Delete(req.params.id);
      res.send(constants.responseFormat(200, 'Tag', data));
    } catch (err) {
      res.status(400).send(constants.responseFormat(400, 'Tag', [err.message]));
      logger.error(err.message);
    }
  });
};
