var express = require("express");
var router = express.Router();
var serviceController = require("../controller/serviceController");
var { verifyToken, verifyService } = require("../middleware/jwtAction");

router.post(
  "/product/create",
  verifyToken,
  verifyService,
  serviceController.importProduct
);
router.get(
  "/products",
  verifyToken,
  verifyService,
  serviceController.getAllModelName
);
router.get(
  "/products/history",
  verifyToken,
  verifyService,
  serviceController.getProductHistory
);
router.get(
  "/products/product-in-month",
  verifyToken,
  verifyService,
  serviceController.getProductInMonth
);
router.get(
  "/products/product-in-year",
  verifyToken,
  verifyService,
  serviceController.getProductInYear
);
router.get(
  "/products/product-in-quarter",
  verifyToken,
  verifyService,
  serviceController.getProductInQuarterly
);

module.exports = router;
