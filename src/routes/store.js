var express = require("express");
var router = express.Router();
var storeController = require("../controller/storeController");
var { verifyToken, verifyStore } = require("../middleware/jwtAction");

router.get("/products", verifyToken, storeController.getAllModelName);
router.post(
  "/products/create",
  verifyToken,
  verifyStore,
  storeController.importProduct
);
router.post(
  "/products/sell",
  verifyToken,
  verifyStore,
  storeController.sellProduct
);
router.get("/test", storeController.getProductMonth);
router.get(
  "/products/history",
  verifyToken,
  verifyStore,
  storeController.getProductHistory
);
router.get(
  "/products/product-in-month",
  verifyToken,
  verifyStore,
  storeController.getProductInMonth
);
router.get(
  "/products/product-in-year",
  verifyToken,
  verifyStore,
  storeController.getProductInYear
);
router.get(
  "/products/product-in-quarter",
  verifyToken,
  verifyStore,
  storeController.getProductInQuarterly
);
router.get(
  "/products/product-out-month",
  verifyToken,
  verifyStore,
  storeController.getProductInMonth
);
router.get(
  "/products/product-out-year",
  verifyToken,
  verifyStore,
  storeController.getProductInYear
);
router.get(
  "/products/product-out-quarter",
  verifyToken,
  verifyStore,
  storeController.getProductInQuarterly
);

module.exports = router;
