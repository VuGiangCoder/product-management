var express = require("express");
var router = express.Router();
var adminController = require("../controller/adminController");
var { verifyToken, verifyAdmin } = require("../middleware/jwtAction");

router.post("/regis", verifyToken, verifyAdmin, adminController.createUser);
router.post("/delete", verifyToken, verifyAdmin, adminController.deleteUser);
router.post(
  "/product/create",
  verifyToken,
  verifyAdmin,
  adminController.createProduct
);
router.get(
  "/product",
  verifyToken,
  verifyAdmin,
  adminController.findAllProduct
);
router.get("/abc", verifyToken, verifyAdmin, adminController.test);
router.get(
  "/product_type",
  verifyToken,
  verifyAdmin,
  adminController.getProductType
);
module.exports = router;
