'use strict';
//TODO ADD .ENV variables
module.exports = () => {
  const requiredEnv = ['PORT', 'MONGOCNN', 'REDIS_HOST', 'REDIS_PORT'];

  for (const envVar of requiredEnv) {
    if (!process.env[envVar])
      throw new Error(`${envVar} env varible must be declared in .env file`);
  }
};
