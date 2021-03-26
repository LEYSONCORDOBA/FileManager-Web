'use strict';

const redis = require('../loaders/redis');
const auth = require('./auth');
const { promisify } = require('util');
const getElementByKey = promisify(redis.GET).bind(redis);
const setElementByKey = promisify(redis.SETEX).bind(redis);
const delElementByKey = promisify(redis.DEL).bind(redis);
const existsKey = promisify(redis.EXISTS).bind(redis);

module.exports = {
  setKey: async (key, value) => {
    const token = auth.signJWT(value);
    await setElementByKey(key, process.env.TTL_PASSWORD || 3600, token);
    return token;
  },
  existKey: async key =>
    await existsKey(key, (err, reply) => {
      if (reply === 1) return true;
      else return false;
    }),

  delKey: async key =>
    await delElementByKey(key, (err, reply) => {
      if (err) return false;
      return true;
    }),

  getKey: async key => await getElementByKey(key)
};
