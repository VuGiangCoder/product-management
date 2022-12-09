var express = require("express");
var adminRouter = require("./admin");
var adminController = require("../controller/adminController");
var factoryRouter = require("./factory");
var { verifyToken, verifyAdmin } = require("../middleware/jwtAction");

let initWebRouter = (app) => {
  app.use("/admin", adminRouter);
  app.use("/factory", factoryRouter);
  app.post("/login", adminController.login);
  app.post("/changePassword", verifyToken, adminController.changePassword);
  app.get("/forgetPassword", adminController.forgetPassword);
};

module.exports = initWebRouter;
