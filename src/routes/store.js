var express = require("express");
var router = express.Router();
var factoryController = require("../controller/factoryController");
var storeController = require("../controller/storeController");
var { verifyToken, verifyStore } = require("../middleware/jwtAction");

router.get("/products", verifyToken, factoryController.getAllModelName);
router.post(
  "/products/create",
  verifyToken,
  verifyStore,
  storeController.importProduct
);

module.exports = router;
