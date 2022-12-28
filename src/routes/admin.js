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
module.exports = router;
