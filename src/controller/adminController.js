var mongoose = require("mongoose");
var User = require("../model/userModel");
var Product = require("../model/productseriModel");
var ProductHis = require("../model/producthistoryModel");

var crudService = require("../service/crudService");
var sendMail = require("../service/sendMail");
var { createJWT } = require("../middleware/jwtAction");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var generator = require("generate-password");
require("dotenv").config();

let login = async (req, res) => {
  let check = await crudService.signIn(req);
  if (check == false) {
    res.status(404).json({
      message: "Tài khoản mật khẩu không chính xác",
      errCode: 0,
    });
  } else {
    let user = await User.findOne({
      email: req.body.email,
    })
      .select(["-password", "-__v"])
      .exec();
    let token = createJWT(user._id, user.email, user.role);
    res.cookie("token", token);
    return res.status(200).json({
      message: "Đăng nhập thành công",
      errCode: 0,
      payload: user,
    });
  }
};

let createUser = async (req, res) => {
  try {
    console.log(req.cookies);
    var user = await User.findOne({
      email: req.body.email,
    });
    if (user == null) {
      await crudService.createNewUser(req);
      var html = `<h3>BigCorp</h3><p><b>BigCorp xin thông báo:</b> Tài khoản ${req.body.email} vừa trở thành đối tác của BigCorp. Rất vui được trở thành nhà đồng hành của đối tác trên chặng đường sắp tới.</p>`;
      sendMail(req.body.email, "Sign in verify", html);
      return res.status(200).json({
        message: "xác thực đăng kí trong email",
        errCode: 0,
      });
    } else {
      return res.status(200).json({
        message: "email has used",
        errCode: 0,
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Nhập sai",
      errCode: 1,
    });
  }
};

let deleteUser = async (req, res) => {
  try {
    await User.deleteOne({
      email: req.body.email,
    });
    return res.status(200).json({
      message: "Xoá tài khoản thành công",
      errCode: 0,
    });
  } catch (error) {
    console.log(error);
  }
};
let changePassword = async (req, res) => {
  try {
    var user = await User.findOne({
      email: req.body.email,
    });
    if (user == null) {
      return res.status(404).json({
        message: "Yêu cầu đăng nhập",
        errCode: 0,
      });
    } else {
      var check = await bcrypt.compare(req.body.currentPassword, user.password);
      if (check) {
        var password = await crudService.hashUserPassword(req.body.newPassword);
        await User.updateOne(
          {
            email: req.body.email,
          },
          {
            password: password,
          }
        );
        return res.status(200).json({
          message: "Đổi mật khẩu thành công",
          errCode: 0,
        });
      } else {
        return res.status(404).json({
          message: "Mật khẩu hiện tại không đúng",
          errCode: 0,
        });
      }
    }
  } catch (error) {
    return res.status(400).json("Yêu cầu đăng nhập");
  }
};

let getAllUser = async (req, res) => {
  var users = await User.find({
    role: { $ne: "admin" },
  }).select(["_id", "email", "role"]);
  return res.json({
    errCode: 0,
    payload: users,
  });
};
// let createProduct = async (req, res) => {
//   try {
//     await crudService.addNewProduct(req);
//     var html = `<h3>BigCorp</h3><p><b>BigCorp xin thông báo:</b> Chúng tôi vừa ra mắt mặt hàng mới, hãy ghé thăm để được hưởng nhiều ưu đã nhé cả nhà.</p>`;
//     var emails = await User.find({}).select(["email", "-_id"]);
//     emails.forEach(async function (email) {
//       sendMail(email, "New product", html);
//     });

//     return res.status(200).json({
//       message: "Thêm sản phẩm mới thành công",
//       errCode: 0,
//     });
//   } catch (error) {}
// };

let getAllProductName = async (req, res) => {
  var page = req.body.page;
  var size = req.body.size;
  var productArr = [];
  var i = 0;
  try {
    var products = await Product.find({})
      .skip((page - 1) * size)
      .limit(size);
    products.forEach(function (product) {
      productArr[i] = product;
      i++;
    });
    return res.status(200).json({
      message: "Danh sách sản phẩm",
      errCode: 0,
      payload: {
        page: page,
        size: size,
        totalpage: 4,
        products: productArr,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
let forgetPassword = async (req, res) => {
  var email = req.body.email;
  var user = await User.findOne({
    email: email,
  });
  let newPassword = await generator.generate({
    length: 10,
    numbers: true,
  });
  let password = await crudService.hashUserPassword(newPassword);
  if (user) {
    user.password = password;
    await user.save();
    var html = `<h3>BigCorp</h3><p><b>BigCorp xin thông báo: </b>Mật khẩu mới của đối tác là: <b>${newPassword}</b>. Hãy bảo mật thông tin này.</p>`;
    sendMail(email, "Quên mật khẩu", html);
  }
  return res.status(200).json({
    message: "Mật khẩu mới được gửi trong email",
    errCode: 0,
  });
};
let getAmountOfRole = async (req, res) => {
  var amountFactory = 0;
  var amountStore = 0;
  var amountService = 0;
  var i = 0;
  var j = 0;
  var k = 0;
  var userFactoryArr = [];
  var userServiceArr = [];
  var userStoreArr = [];

  var users = await User.find({});
  users.forEach(async function (user) {
    var role = user.get("role");
    var id = user.get("_id");
    if (role == "factory") {
      userFactoryArr[i] = id;
      i++;
    }
    if (role == "store") {
      userStoreArr[j] = id;
      j++;
    }
    if (role == "service") {
      userServiceArr[k] = id;
      k++;
    }
  });
  for (m = 0; m < i; m++) {
    var productFactory = await Product.find({
      userid: userFactoryArr[m],
    });
    productFactory.forEach(async function (product) {
      var amount = product.get("amount");
      amountFactory += amount;
    });
  }
  for (m = 0; m < j; m++) {
    var productStore = await Product.find({
      userid: userStoreArr[m],
    });
    productStore.forEach(async function (product) {
      var amount = product.get("amount");
      amountStore += amount;
    });
  }
  for (m = 0; m < k; m++) {
    var productService = await Product.find({
      userid: userServiceArr[m],
    });
    productService.forEach(async function (product) {
      var amount = product.get("amount");
      amountService += amount;
    });
  }

  return res.status(200).json({
    factory: amountFactory,
    store: amountStore,
    service: amountService,
  });
};
let getProductMonth = async (req, res) => {
  var year = req.body.year;
  var month = req.body.month;

  var amount = 0;
  var products = await ProductHis.find({
    status: 1,
    createAt: {
      $gte: new Date(year, month - 1, 1),
      $lte: new Date(year, month, 1),
    },
  });
  products.forEach(async function (product) {
    var quantity = product.get("quantity");
    amount += quantity;
  });
  return res.json({
    year: year,
    month: month,
    amount: amount,
  });
};
let getProductYear = async (req, res) => {
  var year = req.body.year;

  var amount = 0;
  var products = await ProductHis.find({
    status: 1,
    createAt: {
      $gte: new Date(year, 1, 1),
      $lte: new Date(year + 1, 1, 1),
    },
  });
  products.forEach(async function (product) {
    var quantity = product.get("quantity");
    amount += quantity;
  });
  return res.json({
    year: year,
    amount: amount,
  });
};
module.exports = {
  login,
  createUser,
  deleteUser,
  changePassword,
  forgetPassword,
  getAllProductName,
  getAllUser,
  getAmountOfRole,
  getProductMonth,
  getProductYear,
};
