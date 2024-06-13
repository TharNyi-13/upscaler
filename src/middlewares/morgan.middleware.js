const morgan = require("morgan");
const Logger = require("../utils/logger.utility");
const applicationConfig = require("../configs/application.config");

const logger = new Logger("morgan.middleware");

const stream = {
  write: (message) => logger.http(message),
};

const skip = () => {
  return applicationConfig.winston.skipHttp;
};

const morganMiddleware = morgan(
  ":method :url :status :response-time ms - :res[content-length]",
  { stream, skip }
);

module.exports = morganMiddleware;
