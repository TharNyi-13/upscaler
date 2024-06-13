const Logger = require("../utils/logger.utility");
const path = require("path");
const fs = require("fs");
const tf = require("@tensorflow/tfjs-node");
const Upscaler = require("upscaler/node");
const defaultModel = require("@upscalerjs/default-model");
const esrganSlimModels = require("@upscalerjs/esrgan-slim");
const esrganMediumModels = require("@upscalerjs/esrgan-medium");

const logger = new Logger("upscalerjs.management.service");

/**
 * Generates a timestamp in the format YYYYMMDD_HHMMSS
 * @returns {string} The formatted timestamp
 */
function generateTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

class UpscalerJSManagement {
  constructor() {
    this.upscaler = new Upscaler();
  }

  async getModel() {
    try {
      logger.debug(`::gettingModelPackage`);

      const modelPackage = await this.upscaler.getModel();

      return modelPackage;
    } catch (error) {
      logger.error(`Error getting model package:`, error);

      throw error;
    }
  }

  async upscaleDefaultModel(file) {
    const fileOriginalName = file.originalname;
    logger.debug(`::upscalingDefaultModel for [${fileOriginalName}]`);
    try {
      const upscaler = new Upscaler({
        model: defaultModel,
      });
      const imageBuffer = file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);

      await upscaler.warmup([
        {
          patchSize: 64,
          padding: 6,
        },
      ]);
      logger.debug(`All warmed up for [${fileOriginalName}]!`);

      const start = performance.now();
      const tensor = await upscaler.upscale(image, {
        output: "tensor",
        patchSize: 64,
        padding: 6,
        progress: (percent, slice) => {
          logger.debug(
            `${(percent * 100).toFixed(
              2
            )}% of [${fileOriginalName}] has been processed`
          );
          slice.dispose();
        },
      });
      const duration = ((performance.now() - start) / 1000).toFixed(2);
      logger.debug(`Duration for [${fileOriginalName}]: ${duration}s`);
      image.dispose();
      // tensor.print();

      const upscaledTensor = await tf.node.encodePng(tensor);
      const timestamp = generateTimestamp();
      const outputFilePath = path.resolve(
        __dirname,
        `../public/upscaled/default/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling default model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleESRGANSlimModel(file, scale) {
    const fileOriginalName = file.originalname;
    logger.debug(
      `::upscalingESRGANSlim${scale}Model for [${fileOriginalName}]`
    );
    try {
      const upscaler = new Upscaler({
        model: esrganSlimModels[scale],
      });
      const imageBuffer = file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);

      await upscaler.warmup([
        {
          patchSize: 64,
          padding: 6,
        },
      ]);
      logger.debug(`All warmed up for [${fileOriginalName}]!`);

      const start = performance.now();
      const tensor = await upscaler.upscale(image, {
        output: "tensor",
        patchSize: 64,
        padding: 6,
        progress: (percent, slice) => {
          logger.debug(
            `${(percent * 100).toFixed(
              2
            )}% of [${fileOriginalName}] has been processed`
          );
          slice.dispose();
        },
      });
      const duration = ((performance.now() - start) / 1000).toFixed(2);
      logger.debug(`Duration for [${fileOriginalName}]: ${duration}s`);
      image.dispose();
      // tensor.print();

      const upscaledTensor = await tf.node.encodePng(tensor);
      const timestamp = generateTimestamp();
      const outputFilePath = path.resolve(
        __dirname,
        `../public/upscaled/ESRGANSlim${scale}/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling ESRGANSlim${scale} model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }
}

module.exports = UpscalerJSManagement;
