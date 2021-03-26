const expressLoaders = require('./express');
require('./validateEnv')();
require('./mongo');
require('./redis');

module.exports = async ({ expressApp }) => {
  await expressLoaders({ app: expressApp });
};
