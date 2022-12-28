var express = require("express");
var router = express.Router();
var factoryController = require("../controller/factoryController");
var { verifyToken, verifyFactory } = require("../middleware/jwtAction");

router.post(
  "/products/create",
  verifyToken,
  verifyFactory,
  factoryController.importProduct
);
router.get(
  "/products",
  verifyToken,
  verifyFactory,
  factoryController.getAllModelName
);
router.get(
  "/products/history",
  verifyToken,
  verifyFactory,
  factoryController.getProductHistory
);

router.get(
  "/products/product-in-month",
  verifyToken,
  verifyFactory,
  factoryController.getProductInMonth
);
router.get(
  "/products/product-in-year",
  verifyToken,
  verifyFactory,
  factoryController.getProductInYear
);
router.get(
  "/products/product-in-quarter",
  verifyToken,
  verifyFactory,
  factoryController.getProductInQuarterly
);
module.exports = router;
