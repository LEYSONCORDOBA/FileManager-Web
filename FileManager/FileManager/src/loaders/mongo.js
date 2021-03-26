'use strict';

const mongoose = require('mongoose');
const { logger } = require('../util');

mongoose
  .connect(process.env.MONGOCNN, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(_ => logger.info('MongoDB Connect: ON'))
  .catch(err => logger.error(`Error al Conectar mongo:  ${err}`));

module.exports = mongoose;
