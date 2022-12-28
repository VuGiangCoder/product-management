require("dotenv").config();
const jwt = require("jsonwebtoken");

let createJWT = (id, email, role) => {
  let token = jwt.sign({ id, email, role }, process.env.secret);
  console.log(token);
  return token;
};
let verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json({
      message: "No token",
      errCode: 0,
    });
  } else {
    console.log(token);
    let data = jwt.verify(token, process.env.secret);
    req.user = data;
    next();
  }
};
let verifyAdmin = (req, res, next) => {
  if (req.user.role != "admin") {
    //   console.log(req.user.role);
    return res.status(404).json({
      message: "Bạn không có quyền truy cập",
      errCode: 0,
    });
  }
  next();
};
let verifyFactory = (req, res, next) => {
  if (req.user.role != "factory") {
    //   console.log(req.user.role);
    return res.status(404).json({
      message: "Bạn không có quyền truy cập",
      errCode: 0,
    });
  }
  next();
};
let verifyService = (req, res, next) => {
  if (req.user.role != "service") {
    //   console.log(req.user.role);
    return res.status(404).json({
      message: "Bạn không có quyền truy cập",
      errCode: 0,
    });
  }
  next();
};

let verifyStore = (req, res, next) => {
  if (req.user.role != "store") {
    return res.status(404).json({
      message: "Bạn không có quyền truy cập",
      errCode: 0,
    });
  }
  next();
};
module.exports = {
  createJWT,
  verifyAdmin,
  verifyToken,
  verifyStore,
  verifyFactory,
  verifyService,
};
