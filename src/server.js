const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const morganMiddleware = require("./middlewares/morgan.middleware");
const publicRouter = require("./routes/public.route");
const Logger = require("./utils/logger.utility");
const applicationConfig = require("./configs/application.config");

const logger = new Logger(applicationConfig.serviceName);
const app = express();

app.use(cors());
app.use(helmet());
app.use(morganMiddleware);
app.use(express.json());

app.use("/public/upscaler-js/v1", publicRouter);

app.listen(applicationConfig.port, () => {
  logger.info(`Service started, listening to port - ${applicationConfig.port}`);
});
