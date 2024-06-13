const Logger = require("../utils/logger.utility");
const UpscalerManagement = require("../services/upscalerjs.management.service");
const multer = require("multer");

const logger = new Logger("public.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const upscalerManagement = new UpscalerManagement();

/**
 * This endpoint fetches UpscalerJS's model package.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function fetchModelPackage(req, res) {
  logger.info(`Request received to fetch the model package of UpscalerJS`);

  try {
    const modelPackage = await upscalerManagement.getModel();
    logger.info(`Model package fetched successfully`);

    res.status(200).send({ data: modelPackage });
  } catch (error) {
    logger.error(`Error fetching model package:`, error);

    res
      .status(error.status ?? 500)
      .send({ message: error.message ?? `Internal Server Error` });
  }
}

/**
 * This endpoint upscales the provided image using the default model of the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithDefaultModel(req, res) {
  logger.info(`Using the default upscaling model of UpscalerJS`);

  upload.array("files")(req, res, async (err) => {
    if (err) {
      logger.error(`Error uploading files:`, err);
      return res.status(400).send({ message: `Error uploading files` });
    }

    if (!req.files || req.files.length === 0) {
      logger.warn(`No files provided in the request`);
      return res.status(400).send({ message: `Files need to be provided` });
    }

    try {
      const upscaledImages = await Promise.all(
        req.files.map(async (file) => {
          try {
            const upscaledImage = await upscalerManagement.upscaleDefaultModel(
              file
            );
            logger.info(
              `Image ${file.originalname} was upscaled using the default model`
            );

            return { filename: file.originalname, upscaledImage };
          } catch (error) {
            logger.error(`Upscaling failed for ${file.originalname}:`, error);
            throw error;
          }
        })
      );

      res.set("Content-Type", "application/json");
      res.status(200).send({
        message: `Images were upscaled using the default model`,
        images: upscaledImages.map((img) => img.filename),
      });
    } catch (error) {
      logger.error(`Upscaling failed:`, error);

      res
        .status(error.status ?? 500)
        .send({ message: error.message ?? `Internal Server Error` });
    }
  });
}

/**
 * This endpoint upscales the provided image using the ESRGANSlim model, corresponding to the desired scale(x2, x3, x4, x8), in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithESRGANSlimModel(req, res) {
  const scale = req.params.scale;

  logger.info(`Using the ESRGANSlim${scale} upscaling model of UpscalerJS`);

  upload.array("files")(req, res, async (err) => {
    if (err) {
      logger.error(`Error uploading files:`, err);
      return res.status(400).send({ message: `Error uploading files` });
    }

    if (!req.files || req.files.length === 0) {
      logger.warn(`No files provided in the request`);
      return res.status(400).send({ message: `Files need to be provided` });
    }

    try {
      const upscaledImages = await Promise.all(
        req.files.map(async (file) => {
          try {
            const upscaledImage =
              await upscalerManagement.upscaleESRGANSlimModel(file, scale);
            logger.info(
              `Image ${file.originalname} was upscaled using the ESRGANSlim${scale} model`
            );

            return { filename: file.originalname, upscaledImage };
          } catch (error) {
            logger.error(`Upscaling failed for ${file.originalname}:`, error);
            throw error;
          }
        })
      );

      res.set("Content-Type", "application/json");
      res.status(200).send({
        message: `Images were upscaled using the ESRGANSlim${scale} model`,
        images: upscaledImages.map((img) => img.filename),
      });
    } catch (error) {
      logger.error(`Upscaling failed:`, error);

      res
        .status(error.status ?? 500)
        .send({ message: error.message ?? `Internal Server Error` });
    }
  });
}

module.exports = {
  fetchModelPackage,
  upscaleImagesWithDefaultModel,
  upscaleImagesWithESRGANSlimModel,
};
