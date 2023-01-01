var express = require("express");
var router = express.Router();
var adminController = require("../controller/adminController");
var { verifyToken, verifyAdmin } = require("../middleware/jwtAction");

router.post("/create", verifyToken, verifyAdmin, adminController.createUser);
router.post("/delete", verifyToken, verifyAdmin, adminController.deleteUser);
router.get(
  "/products",
  verifyToken,
  verifyAdmin,
  adminController.getAllProductName
);
router.get(
  "/products/get-amount-position",
  verifyToken,
  verifyAdmin,
  adminController.getAmountOfRole
);
router.get("/products/getProductMonth", adminController.getProductMonth);
router.get("/products/getProductYear", adminController.getProductYear);
router.get("/users", verifyToken, verifyAdmin, adminController.getAllUser);
module.exports = router;
