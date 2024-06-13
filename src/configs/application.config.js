const dotenv = require("dotenv");
const DailyRotateFileTransportOptions = require("winston-daily-rotate-file");

dotenv.config();

const fileTransportOptions = new DailyRotateFileTransportOptions({
  filename: `${process.env.LOG_DIR}/${process.env.SERVICE_NAME}-%DATE%.log`,
  level: process.env.LOG_LEVEL ?? "info",
  datePattern: "YYYY-MM-DD",
  maxFiles: 365,
  maxSize: "2mb",
  zippedArchive: true,
  utc: true,
  options: { flags: "a" },
});

module.exports = {
  port: process.env.SERVICE_PORT,
  serviceName: process.env.SERVICE_NAME,
  log: {
    format: ":method :url :status :response-time ms - :res[content-length]",
    directory: process.env.LOG_DIR,
  },
  winston: {
    skipHttp: false,
    level: process.env.LOG_LEVEL ?? "debug",
    fileTransportOptions: fileTransportOptions,
  },
};
