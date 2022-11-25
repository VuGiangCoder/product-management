var express = require("express");
var router = express.Router();
var adminRouter = require("./admin");
var adminController = require("../controller/adminController");
var factoryRouter = require("./factory");
var { verifyToken, verifyAdmin } = require("../middleware/jwtAction");

let initWebRouter = (app) => {
  app.use("/admin", adminRouter);
  app.post("/login", adminController.login);
  app.post("/changePassword", verifyToken, adminController.changePassword);
  app.get("/forgetPassword", adminController.forgetPassword);
  app.user("/factory", factoryRouter);
};

module.exports = initWebRouter;
