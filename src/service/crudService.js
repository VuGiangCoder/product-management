var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var User = require("../model/userModel");
var mongoose = require("mongoose");
var ProductHistoryModel = require("../model/producthistoryModel");
var ProductSeriModel = require("../model/productseriModel");
const jwt = require("jsonwebtoken");

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

let importProduct = async (req) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var modelname = req.body.modelname;
  var useroutid = req.body.useroutid;
  var name = req.body.name;
  var type = req.body.type;
  var color = req.body.color;
  var weight = req.body.weight;
  var height = req.body.height;
  var expiry = req.body.expiry;
  var quantity = req.body.quantity;
  var status = req.body.status;

  var producthistorymodel = await ProductHistoryModel.findOne({
    userinid: data.id,
    modelname: modelname,
  });
  var producthistorytmp = new ProductHistoryModel({
    userinid: data.id,
    useroutid: useroutid,
    modelname: modelname,
    inout: "in",
    quantity: quantity,
    status: status,
  });
  await ProductHistoryModel.create(producthistorytmp);

  if (producthistorymodel == null) {
    var productserimodel = await ProductSeriModel.findOne({
      userid: data.id,
      modelname: modelname,
    });
    if (productserimodel == null) {
      var product = new ProductSeriModel({
        modelname: modelname,
        name: name,
        userid: data.id,
        type: type,
        color: color,
        weight: weight,
        height: height,
        expiry: expiry,
        amount: quantity,
      });
      await ProductSeriModel.create(product);
    } else {
    }
  } else {
    var productseritmp = await ProductSeriModel.findOne({
      userid: data.id,
      modelname: modelname,
    });
    productseritmp.amount = productseritmp.amount + quantity;
    await productseritmp.save();
  }
  var productseriouttmp = await ProductSeriModel.findOne({
    userid: useroutid,
    modelname: modelname,
  });
  productseriouttmp.amount = productseriouttmp.amount - quantity;
  await productseriouttmp.save();
};
module.exports = {
  createNewUser,
  signIn,
  hashUserPassword,
  importProduct,
};
