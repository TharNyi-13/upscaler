const Logger = require("../utils/logger.utility");
const path = require("path");
const fs = require("fs");
const tf = require("@tensorflow/tfjs-node");
const Upscaler = require("upscaler/node");
const defaultModel = require("@upscalerjs/default-model");
const esrganSlimModels = require("@upscalerjs/esrgan-slim");
const esrganMediumModels = require("@upscalerjs/esrgan-medium");
const esrganThickModels = require("@upscalerjs/esrgan-thick");
const esrganLegacyModels = require("@upscalerjs/esrgan-legacy");
const maximDeblurringModel = require("@upscalerjs/maxim-deblurring");
const maximDenoisingModel = require("@upscalerjs/maxim-denoising");
const maximEnhancementModel = require("@upscalerjs/maxim-enhancement");
const maximRetouchingModel = require("@upscalerjs/maxim-retouching");
const maximDerainingModel = require("@upscalerjs/maxim-deraining");
const maximDehazingIndoorModel = require("@upscalerjs/maxim-dehazing-indoor");
const maximDehazingOutdoorModel = require("@upscalerjs/maxim-dehazing-outdoor");

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

  async upscaleESRGANMediumModel(file, scale) {
    const fileOriginalName = file.originalname;
    logger.debug(
      `::upscalingESRGANMedium${scale}Model for [${fileOriginalName}]`
    );
    try {
      const upscaler = new Upscaler({
        model: esrganMediumModels[scale],
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
        `../public/upscaled/ESRGANMedium${scale}/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling ESRGANMedium${scale} model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleESRGANThickModel(file, scale) {
    const fileOriginalName = file.originalname;
    logger.debug(
      `::upscalingESRGANThick${scale}Model for [${fileOriginalName}]`
    );
    try {
      const upscaler = new Upscaler({
        model: esrganThickModels[scale],
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
        `../public/upscaled/ESRGANThick${scale}/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling ESRGANThick${scale} model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleESRGANLegacyModel(file, scale) {
    const fileOriginalName = file.originalname;
    logger.debug(
      `::upscalingESRGANLegacy${scale}Model for [${fileOriginalName}]`
    );
    try {
      const upscaler = new Upscaler({
        model: esrganLegacyModels[scale],
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
        `../public/upscaled/ESRGANLegacy${scale}/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling ESRGANLegacy${scale} model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleMAXIMDeblurringModel(file) {
    const fileOriginalName = file.originalname;
    logger.debug(`::upscalingMAXIMDeblurringModel for [${fileOriginalName}]`);
    try {
      const upscaler = new Upscaler({
        model: maximDeblurringModel,
      });
      const imageBuffer = file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);

      await upscaler.warmup([
        {
          patchSize: 64,
          padding: 2,
        },
      ]);
      logger.debug(`All warmed up for [${fileOriginalName}]!`);

      const start = performance.now();
      const tensor = await upscaler.upscale(image, {
        output: "tensor",
        patchSize: 64,
        padding: 2,
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
        `../public/upscaled/MAXIMDeblurring/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling MAXIMDeblurring model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleMAXIMDenoisingModel(file) {
    const fileOriginalName = file.originalname;
    logger.debug(`::upscalingMAXIMDenoisingModel for [${fileOriginalName}]`);
    try {
      const upscaler = new Upscaler({
        model: maximDenoisingModel,
      });
      const imageBuffer = file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);

      await upscaler.warmup([
        {
          patchSize: 64,
          padding: 2,
        },
      ]);
      logger.debug(`All warmed up for [${fileOriginalName}]!`);

      const start = performance.now();
      const tensor = await upscaler.upscale(image, {
        output: "tensor",
        patchSize: 64,
        padding: 2,
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
        `../public/upscaled/MAXIMDenoising/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling MAXIMDenoising model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleMAXIMEnhancementModel(file) {
    const fileOriginalName = file.originalname;
    logger.debug(`::upscalingMAXIMEnhancementModel for [${fileOriginalName}]`);
    try {
      const upscaler = new Upscaler({
        model: maximEnhancementModel,
      });
      const imageBuffer = file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);

      await upscaler.warmup([
        {
          patchSize: 64,
          padding: 2,
        },
      ]);
      logger.debug(`All warmed up for [${fileOriginalName}]!`);

      const start = performance.now();
      const tensor = await upscaler.upscale(image, {
        output: "tensor",
        patchSize: 64,
        padding: 2,
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
        `../public/upscaled/MAXIMEnhancement/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling MAXIMEnhancement model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleMAXIMRetouchingModel(file) {
    const fileOriginalName = file.originalname;
    logger.debug(`::upscalingMAXIMRetouchingModel for [${fileOriginalName}]`);
    try {
      const upscaler = new Upscaler({
        model: maximRetouchingModel,
      });
      const imageBuffer = file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);

      await upscaler.warmup([
        {
          patchSize: 64,
          padding: 2,
        },
      ]);
      logger.debug(`All warmed up for [${fileOriginalName}]!`);

      const start = performance.now();
      const tensor = await upscaler.upscale(image, {
        output: "tensor",
        patchSize: 64,
        padding: 2,
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
        `../public/upscaled/MAXIMRetouching/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling MAXIMRetouching model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleMAXIMDerainingModel(file) {
    const fileOriginalName = file.originalname;
    logger.debug(`::upscalingMAXIMDerainingModel for [${fileOriginalName}]`);
    try {
      const upscaler = new Upscaler({
        model: maximDerainingModel,
      });
      const imageBuffer = file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);

      await upscaler.warmup([
        {
          patchSize: 64,
          padding: 2,
        },
      ]);
      logger.debug(`All warmed up for [${fileOriginalName}]!`);

      const start = performance.now();
      const tensor = await upscaler.upscale(image, {
        output: "tensor",
        patchSize: 64,
        padding: 2,
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
        `../public/upscaled/MAXIMDeraining/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling MAXIMDeraining model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleMAXIMDehazingIndoorModel(file) {
    const fileOriginalName = file.originalname;
    logger.debug(
      `::upscalingMAXIMDehazingIndoorModel for [${fileOriginalName}]`
    );
    try {
      const upscaler = new Upscaler({
        model: maximDehazingIndoorModel,
      });
      const imageBuffer = file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);

      await upscaler.warmup([
        {
          patchSize: 64,
          padding: 2,
        },
      ]);
      logger.debug(`All warmed up for [${fileOriginalName}]!`);

      const start = performance.now();
      const tensor = await upscaler.upscale(image, {
        output: "tensor",
        patchSize: 64,
        padding: 2,
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
        `../public/upscaled/MAXIMDehazingIndoor/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling MAXIMDehazingIndoor model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }

  async upscaleMAXIMDehazingOutdoorModel(file) {
    const fileOriginalName = file.originalname;
    logger.debug(
      `::upscalingMAXIMDehazingOutdoorModel for [${fileOriginalName}]`
    );
    try {
      const upscaler = new Upscaler({
        model: maximDehazingOutdoorModel,
      });
      const imageBuffer = file.buffer;
      const image = tf.node.decodeImage(imageBuffer, 3);

      await upscaler.warmup([
        {
          patchSize: 64,
          padding: 2,
        },
      ]);
      logger.debug(`All warmed up for [${fileOriginalName}]!`);

      const start = performance.now();
      const tensor = await upscaler.upscale(image, {
        output: "tensor",
        patchSize: 64,
        padding: 2,
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
        `../public/upscaled/MAXIMDehazingOutdoor/${
          path.parse(fileOriginalName).name
        }_upscaled_${timestamp}.png`
      );
      fs.writeFileSync(outputFilePath, upscaledTensor);
      tensor.dispose();

      return upscaledTensor;
    } catch (error) {
      logger.error(
        `Error upscaling MAXIMDehazingOutdoor model for [${fileOriginalName}]:`,
        error
      );
      throw error;
    }
  }
}

module.exports = UpscalerJSManagement;
