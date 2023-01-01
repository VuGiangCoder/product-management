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
  //console.log(req.body);
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
let exportProduct = async (req) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var modelname = req.body.modelname;
  var userinid = req.body.userinid;
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
    userinid: userinid,
    useroutid: data.id,
    modelname: modelname,
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
  }
  var productseriouttmp = await ProductSeriModel.findOne({
    userid: data.id,
    modelname: modelname,
  });
  productseriouttmp.amount = productseriouttmp.amount - quantity;
  await productseriouttmp.save();
};
let getProductHistory = async (req, res) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var size = req.body.size;
  var page = req.body.page;
  var producthistory = await ProductHistoryModel.find({
    $or: [{ userinid: data.id }, { useroutid: data.id }],
  })
    .select(["-_id", "-__v"])
    .limit(size)
    .skip((page - 1) * size);
  return res.json({
    errCode: 0,
    size: size,
    Payload: producthistory,
  });
};
let getProductInMonth = async (req, res) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var year = req.body.year;
  var month = req.body.month;
  var status = req.body.status;

  var count = await ProductHistoryModel.find({
    userinid: data.id,
    createAt: {
      $gte: new Date(year, month - 1, 1),
      $lte: new Date(year, month, 1),
    },
    status: status,
  }).count();
  return res.json({
    errCode: 0,
    year: year,
    month: month,
    amount: count,
  });
};
let getProductInYear = async (req, res) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var year = req.body.year;
  var status = req.body.status;
  var count = await ProductHistoryModel.find({
    userinid: data.id,
    createAt: {
      $gte: new Date(year, 1, 1),
      $lte: new Date(year + 1, 1, 1),
    },
    status: status,
  }).count();
  return res.json({
    errCode: 0,
    year: year,
    amount: count,
  });
};
let getProductInQuarterly = async (req, res) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var year = req.body.year;
  var quarter = req.body.quarter;
  var status = req.body.status;
  var count = await ProductHistoryModel.find({
    userinid: data.id,
    createAt: {
      $gte: new Date(year, (quarter - 1) * 3, 1),
      $lte: new Date(year, quarter * 3 + 1, 1),
    },
    status: status,
  }).count();
  return res.json({
    errCode: 0,
    year: year,
    quater: quarter,
    amount: count,
  });
};
let getProductOutMonth = async (req, res) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var year = req.body.year;
  var month = req.body.month;
  var status = req.body.status;

  var count = await ProductHistoryModel.find({
    useroutid: data.id,
    createAt: {
      $gte: new Date(year, month - 1, 1),
      $lte: new Date(year, month, 1),
    },
    status: status,
  }).count();
  return res.json({
    errCode: 0,
    year: year,
    month: month,
    amount: count,
  });
};
let getProductOutYear = async (req, res) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var year = req.body.year;
  var status = req.body.status;
  var count = await ProductHistoryModel.find({
    useroutid: data.id,
    createAt: {
      $gte: new Date(year, 1, 1),
      $lte: new Date(year + 1, 1, 1),
    },
    status: status,
  }).count();
  return res.json({
    errCode: 0,
    year: year,
    amount: count,
  });
};
let getProductOutQuarterly = async (req, res) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var year = req.body.year;
  var quarter = req.body.quarter;
  var status = req.body.status;
  var count = await ProductHistoryModel.find({
    useroutid: data.id,
    createAt: {
      $gte: new Date(year, (quarter - 1) * 3, 1),
      $lte: new Date(year, quarter * 3 + 1, 1),
    },
    status: status,
  }).count();
  return res.json({
    errCode: 0,
    year: year,
    quater: quarter,
    amount: count,
  });
};
module.exports = {
  createNewUser,
  signIn,
  hashUserPassword,
  importProduct,
  exportProduct,
  getProductHistory,
  getProductInMonth,
  getProductInYear,
  getProductInQuarterly,
  getProductOutMonth,
  getProductOutYear,
  getProductOutQuarterly,
};
