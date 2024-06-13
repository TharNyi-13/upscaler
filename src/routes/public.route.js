const express = require("express");
const router = express.Router();
const publicController = require("../controllers/public.controller");

router.get("/model", publicController.fetchModelPackage);
router.post(
  "/upscale/images/default",
  publicController.upscaleImagesWithDefaultModel
);
router.post(
  "/upscale/images/esrgan-slim/:scale",
  publicController.upscaleImagesWithESRGANSlimModel
);
router.post(
  "/upscale/images/esrgan-medium/:scale",
  publicController.upscaleImagesWithESRGANMediumModel
);
router.post(
  "/upscale/images/esrgan-thick/:scale",
  publicController.upscaleImagesWithESRGANThickModel
);
router.post(
  "/upscale/images/esrgan-legacy/:scale",
  publicController.upscaleImagesWithESRGANLegacyModel
);
router.post(
  "/upscale/images/maxim-deblurring",
  publicController.upscaleImagesWithMAXIMDeblurringModel
);
router.post(
  "/upscale/images/maxim-denoising",
  publicController.upscaleImagesWithMAXIMDenoisingModel
);
router.post(
  "/upscale/images/maxim-enhancement",
  publicController.upscaleImagesWithMAXIMEnhancementModel
);
router.post(
  "/upscale/images/maxim-retouching",
  publicController.upscaleImagesWithMAXIMRetouchingModel
);
router.post(
  "/upscale/images/maxim-deraining",
  publicController.upscaleImagesWithMAXIMDerainingModel
);
router.post(
  "/upscale/images/maxim-dehazing-indoor",
  publicController.upscaleImagesWithMAXIMDehazingIndoorModel
);
router.post(
  "/upscale/images/maxim-dehazing-outdoor",
  publicController.upscaleImagesWithMAXIMDehazingOutdoorModel
);

module.exports = router;
