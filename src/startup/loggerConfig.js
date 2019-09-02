const winston = require("winston");

const logger = winston.createLogger({
  level: "silly",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [new winston.transports.File({ filename: "logger.log" })],
  exceptionHandlers: [new winston.transports.File({ filename: "logger.log" })]
});

process.on("unhandledRejection", ex => {
  throw ex;
});

module.exports = logger;
