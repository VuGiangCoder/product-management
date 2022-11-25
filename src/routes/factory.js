var express = require("express");
var router = express.Router();
var factoryController = require("../controller/factoryController");
var { verifyToken, verifyFactory } = require("../middleware/jwtAction");

router.post("/product/create", factoryController.addNewProduct);
module.exports = router;
