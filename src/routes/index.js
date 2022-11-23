var express = require("express");
var router = express.Router();
var userRouter = require("./users");
var userController = require("../controller/userController");
var { verifyToken, verifyAdmin } = require("../middleware/jwtAction");

let initWebRouter = (app) => {
  app.use("/admin", userRouter);
  app.post("/login", userController.login);
  app.post("/changePassword", verifyToken, userController.changePassword);
  app.get("/forgetPassword", userController.forgetPassword);
};

module.exports = initWebRouter;
