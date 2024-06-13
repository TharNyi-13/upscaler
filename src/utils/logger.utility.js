const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const applicationConfig = require("../configs/application.config");

const winstonConfig = applicationConfig.winston;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  return winstonConfig.level;
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "blue",
  debug: "cyan",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}]: ${info.message} `
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.DailyRotateFile(
    new DailyRotateFile(winstonConfig.fileTransportOptions)
  ),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

class Logger {
  constructor(className) {
    this.className = className;
  }

  info(message) {
    logger.info(`[${this.className}] ${message}`);
  }

  error(message) {
    logger.error(`[${this.className}] ${message}`);
  }

  debug(object) {
    logger.debug(`[${this.className}] ${object}`);
  }

  http(object) {
    logger.http(`[${this.className}] ${object}`);
  }

  warn(message) {
    logger.warn(`[${this.className}] ${message}`);
  }
}

module.exports = Logger;
