var mongoose = require("mongoose");
var User = require("../model/userModel");
var Product = require("../model/productseriModel");
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
let test = async (req, res) => {
  // const start = new Date(2022, 10, 1); // trừ 1 vào tháng
  // const end = new Date(2022, 10, 30);
  // var products = await Product.find({
  //   name: "xe đồ chơi",
  //   createAt: {
  //     $gte: start,
  //     $lte: end,
  //   },
  // }).count();
  // var users = await User.find({}).count();
  // console.log(users);
  // console.log(products);
  // const user = await User.findOne({
  //   _id: "637c278b6f526b7e24050865",
  // });
  console.log(process.env.port);
};
module.exports = {
  login,
  createUser,
  deleteUser,
  changePassword,
  forgetPassword,
  getAllProductName,
  test,
};
