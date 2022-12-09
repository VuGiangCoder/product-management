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
module.exports = router;
