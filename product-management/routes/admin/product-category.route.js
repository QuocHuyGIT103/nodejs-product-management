const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

// const validate = require("../../validates/admin/product-category.validate");
const controller = require("../../controllers/admin/product-category.controller");

const uploadCloud = require("../../middlewares/admin/uploadClound.middleware");

router.get("/", controller.index);
router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  //   validate.createPost,
  controller.createPost
);
module.exports = router;
