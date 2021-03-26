'use strict';
require('dotenv').config('./');
const express = require('express');
const { logger } = require('./util');
const { PORT } = process.env;

const startServer = async () => {
  const app = express();
  await require('./loaders')({ expressApp: app });
  app.listen(PORT, () => {
    const message = `🛡️  Server listening on port: ${PORT} 🛡️ `;
    logger.info(message);
  });
};

(async () => await startServer())();
