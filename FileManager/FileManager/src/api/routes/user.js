'use strict';

const { user: userService } = require('../../services');
const { constants } = require('../../util');
const logger = require('../../util/logger');
const express = require('express');
const auth = require('../../util/auth');
const router = express.Router();

module.exports = app => {
  app.use('/user', router);

  router.get('/', async (req, res) => {
    try {
      const data = await userService.Get(req.query.query);
      res.send(constants.responseFormat(200, 'User', data));
    } catch (err) {
      res
        .status(400)
        .send(constants.responseFormat(400, 'User', [err.message]));
      logger.error(err.message);
    }
  }),
    router.post('/', async (req, res) => {
      try {
        await userService.Post(req.body);
        res.send(
          constants.responseFormat('user', [constants.saveSuccess('User')])
        );
      } catch (e) {
        res.status(400).send(e.message);
      }
    }),
    router.delete('/', async (req, res) => {
      try {
        await userService.Delete(req.query.id);
        res.send(
          constants.responseFormat('user', [constants.removeSuccess('User')])
        );
      } catch (e) {
        res.status(400).send(e.message);
      }
    }),
    router.put('/', async (req, res) => {
      try {
        await userService.Put(req.query.id, req.body);
        res.send(
          constants.responseFormat('user', [constants.updateSuccess('User')])
        );
      } catch (e) {
        res.status(400).send(e.message);
      }
    }),
    router.get('/info', async (req, res) => {
      try {
        const data = await userService.Info(req.headers.authorization);
        res.send(constants.responseFormat(200, 'User', data));
      } catch (e) {
        res.status(400).send(e.message);
      }
    }),
    router.post('/singup', async (req, res) => {
      try {
        await userService.signUp(req.body);
        res.send(
          constants.responseFormat('user', [constants.saveSuccess('User')])
        );
      } catch (e) {
        res.status(400).send(e.message);
      }
    }),
    router.post('/login', async (req, res) => {
      try {
        const data = await userService.login(
          req.body.username,
          req.body.password
        );
        res.send(constants.responseFormatLogin(data));
      } catch (err) {
        res
          .status(400)
          .send(constants.responseFormat(400, 'user', [err.message]));
        logger.error(err.message);
      }
    });
};
