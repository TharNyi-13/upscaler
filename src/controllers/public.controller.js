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

/**
 * This endpoint upscales the provided image using the ESRGANMedium model, corresponding to the desired scale(x2, x3, x4, x8), in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithESRGANMediumModel(req, res) {
  const scale = req.params.scale;

  logger.info(`Using the ESRGANMedium${scale} upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleESRGANMediumModel(file, scale);
            logger.info(
              `Image ${file.originalname} was upscaled using the ESRGANMedium${scale} model`
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
        message: `Images were upscaled using the ESRGANMedium{scale} model`,
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
 * This endpoint upscales the provided image using the ESRGANThick model, corresponding to the desired scale(x2, x3, x4, x8), in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithESRGANThickModel(req, res) {
  const scale = req.params.scale;

  logger.info(`Using the ESRGANThick${scale} upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleESRGANThickModel(file, scale);
            logger.info(
              `Image ${file.originalname} was upscaled using the ESRGANThick${scale} model`
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
        message: `Images were upscaled using the ESRGANThick{scale} model`,
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
 * This endpoint upscales the provided image using the ESRGANLegacy model, corresponding to the desired scale(GANS, PSNRSmall, div2K2X, div2K3X, div2K4X), in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithESRGANLegacyModel(req, res) {
  const scale = req.params.scale;

  logger.info(`Using the ESRGANLegacy${scale} upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleESRGANLegacyModel(file, scale);
            logger.info(
              `Image ${file.originalname} was upscaled using the ESRGANLegacy${scale} model`
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
        message: `Images were upscaled using the ESRGANLegacy{scale} model`,
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
 * This endpoint upscales the provided image using the MAXIMDeblurring model in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithMAXIMDeblurringModel(req, res) {
  logger.info(`Using the MAXIMDeblurring upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleMAXIMDeblurringModel(file);
            logger.info(
              `Image ${file.originalname} was upscaled using the MAXIMDeblurring model`
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
        message: `Images were upscaled using the MAXIMDeblurring model`,
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
 * This endpoint upscales the provided image using the MAXIMDenoising model in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithMAXIMDenoisingModel(req, res) {
  logger.info(`Using the MAXIMDenoising upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleMAXIMDenoisingModel(file);
            logger.info(
              `Image ${file.originalname} was upscaled using the MAXIMDenoising model`
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
        message: `Images were upscaled using the MAXIMDenoising model`,
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
 * This endpoint upscales the provided image using the MAXIMEnhancement model in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithMAXIMEnhancementModel(req, res) {
  logger.info(`Using the MAXIMEnhancement upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleMAXIMEnhancementModel(file);
            logger.info(
              `Image ${file.originalname} was upscaled using the MAXIMEnhancement model`
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
        message: `Images were upscaled using the MAXIMEnhancement model`,
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
 * This endpoint upscales the provided image using the MAXIMRetouching model in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithMAXIMRetouchingModel(req, res) {
  logger.info(`Using the MAXIMRetouching upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleMAXIMRetouchingModel(file);
            logger.info(
              `Image ${file.originalname} was upscaled using the MAXIMRetouching model`
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
        message: `Images were upscaled using the MAXIMRetouching model`,
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
 * This endpoint upscales the provided image using the MAXIMDeraining model in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithMAXIMDerainingModel(req, res) {
  logger.info(`Using the MAXIMDeraining upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleMAXIMDerainingModel(file);
            logger.info(
              `Image ${file.originalname} was upscaled using the MAXIMDeraining model`
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
        message: `Images were upscaled using the MAXIMDeraining model`,
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
 * This endpoint upscales the provided image using the MAXIMDehazingIndoor model in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithMAXIMDehazingIndoorModel(req, res) {
  logger.info(`Using the MAXIMDehazingIndoor upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleMAXIMDehazingIndoorModel(file);
            logger.info(
              `Image ${file.originalname} was upscaled using the MAXIMDehazingIndoor model`
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
        message: `Images were upscaled using the MAXIMDehazingIndoor model`,
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
 * This endpoint upscales the provided image using the MAXIMDehazingOutdoor model in the UpscalerJS service.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function upscaleImagesWithMAXIMDehazingOutdoorModel(req, res) {
  logger.info(`Using the MAXIMDehazingOutdoor upscaling model of UpscalerJS`);

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
              await upscalerManagement.upscaleMAXIMDehazingOutdoorModel(file);
            logger.info(
              `Image ${file.originalname} was upscaled using the MAXIMDehazingOutdoor model`
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
        message: `Images were upscaled using the MAXIMDehazingOutdoor model`,
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
  upscaleImagesWithESRGANMediumModel,
  upscaleImagesWithESRGANThickModel,
  upscaleImagesWithESRGANLegacyModel,
  upscaleImagesWithMAXIMDeblurringModel,
  upscaleImagesWithMAXIMDenoisingModel,
  upscaleImagesWithMAXIMEnhancementModel,
  upscaleImagesWithMAXIMRetouchingModel,
  upscaleImagesWithMAXIMDerainingModel,
  upscaleImagesWithMAXIMDehazingIndoorModel,
  upscaleImagesWithMAXIMDehazingOutdoorModel,
};
