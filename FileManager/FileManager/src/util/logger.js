'use strict';

//import
const {createLogger, format, transports} = require('winston');

let logger = createLogger({
  transports: [new transports.Console()],
});


if (process.env.ENV !== 'PRO') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.simple(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level}  => ${info.message}`)
      )
    })
  );
}

module.exports = logger;
