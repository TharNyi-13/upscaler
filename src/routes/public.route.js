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

module.exports = router;
