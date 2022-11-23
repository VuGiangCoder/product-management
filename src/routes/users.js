var express = require("express");
var router = express.Router();
var userController = require("../controller/userController");
var { verifyToken, verifyAdmin } = require("../middleware/jwtAction");

router.post("/regis", verifyToken, verifyAdmin, userController.createUser);
router.post("/delete", verifyToken, verifyAdmin, userController.deleteUser);
router.post(
  "/product/create",
  verifyToken,
  verifyAdmin,
  userController.createProduct
);
router.get("/product", verifyToken, verifyAdmin, userController.findAllProduct);
module.exports = router;
