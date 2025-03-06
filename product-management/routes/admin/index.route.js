const express = require("express");
const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const systemConfig = require("../../config/system");

const router = express.Router();
const PATH_ADMIN = systemConfig.prefixAdmin || "/admin";

router.use(PATH_ADMIN + "/dashboard", dashboardRoute);
router.use(PATH_ADMIN + "/products", productRoute);

module.exports = router;
