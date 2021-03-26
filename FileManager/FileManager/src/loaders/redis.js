'use strict';

const redis = require('redis');
const { logger } = require('../util');
const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST
});
redisClient.on('connect', _ => {
  console.log('Redis Connect:ON');
});

module.exports = redisClient;
