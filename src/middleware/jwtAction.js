require("dotenv").config();
const jwt = require("jsonwebtoken");

let createJWT = (id, email, role) => {
  let token = jwt.sign({ id, email, role }, "bigcorpsky");
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
    let data = jwt.verify(token, "bigcorpsky");
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
module.exports = {
  createJWT,
  verifyAdmin,
  verifyToken,
};
