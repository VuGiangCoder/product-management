var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var User = require("../model/userModel");
var mongoose = require("mongoose");
var Product = require("../model/productModel");

let hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};
let createNewUser = async (req) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var role = req.body.role;
  var passwordBcrypt = hashUserPassword(password);
  var user = new User({
    email: email,
    password: passwordBcrypt,
    name: name,
    role: role,
  });
  await User.create(user);
};
let signIn = async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({
    email: req.body.email,
  });
  if (user === null) {
    return false;
  } else {
    let comparePass = await bcrypt.compare(req.body.password, user.password);
    if (comparePass == false) {
      return false;
    } else {
      req.session = user;
      return true;
    }
  }
};
var addNewProduct = async (req, res) => {
  var {
    name,
    type,
    date_of_manufacture,
    quarranty_period,
    amount,
    color,
    weight,
    hight,
  } = req.body;

  var product = new Product({
    name: name,
    type: type,
    date_of_manufacture: date_of_manufacture,
    quarranty_period: quarranty_period,
    amount: amount,
    color: color,
    weight: weight,
    hight: hight,
  });
  await Product.create(product);
};
module.exports = {
  createNewUser,
  signIn,
  hashUserPassword,
  addNewProduct,
};
