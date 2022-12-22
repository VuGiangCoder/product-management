var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ProductHistoryModel = require("../model/producthistoryModel");
const ProductseriModel = require("../model/productseriModel");
require("dotenv").config;

let importProduct = async (req, res) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  console.log(data);
  var modelName = req.body.modelName;
  var name = req.body.name;
  var type = req.body.type;
  var color = req.body.color;
  var weight = req.body.weight;
  var height = req.body.height;
  var expiry = req.body.expiry;
  var quantity = req.body.quantity;
  var producthistorymodel = await ProductHistoryModel.findOne({
    userid: data.id,
    modelname: modelName,
  });
  if (producthistorymodel == null) {
    var producthistorytmp = new ProductHistoryModel({
      userid: data.id,
      modelname: modelName,
      userrole: data.role,
      inout: "in",
      quantity: quantity,
      amount: quantity,
      status: 1,
    });
    await ProductHistoryModel.create(producthistorytmp);
    var productserimodel = await ProductseriModel.findOne({
      userid: data.id,
      modelname: modelName,
    });
    if (productserimodel == null) {
      var product = new ProductseriModel({
        modelname: modelName,
        name: name,
        userid: data.id,
        type: type,
        color: color,
        weight: weight,
        height: height,
        expiry: expiry,
      });
      await ProductseriModel.create(product);
    } else {
    }
  } else {
    var producthistorytmp = await ProductHistoryModel.findOne({
      userid: data.id,
      modelname: modelName,
    });
    producthistorytmp.amount = producthistorytmp.amount + quantity;
    await producthistorytmp.save();
  }
  return res.status(200).json({
    message: "Thêm sản phẩm thành công",
    errCode: 0,
  });
};

let exportProduct = async (req, res) => {
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var modelName = req.body.modelname;
  var name = req.body.name;
  var type = req.body.type;
  var amount = req.body.amount;
  var producthistorymodel = await ProductHistoryModel.findOne({
    userid: data.id,
    modelname: modelName,
  });
  producthistorymodel.amount = producthistorymodel.amount - amount;
  producthistorymodel.save();
  var producthistorytmp = new ProductHistoryModel({
    userid: data.id,
    modelname: modelName,
    userrole: data.role,
    inout: "out",
    quantity: amount,
    amount: producthistorymodel.amount,
    status: 2,
  });
  await ProductHistoryModel.create(producthistorytmp);
  return res.json({
    message: "Xuất sản phẩm cho đại lý thành công",
    errCode: 0,
  });
};

let getAllModelName = async (req, res) => {
  var page = req.body.page;
  var size = req.body.size;
  var data = jwt.verify(req.cookies.token, process.env.secret);
  var productSeriModel = await ProductseriModel.find({
    userid: data.id,
  })
    .select(["modelname", "name", "-_id"])
    .skip((page - 1) * size)
    .limit(size);
  return res.json({
    errCode: 0,
    payload: {
      size: size,
      page: page,
      products: productSeriModel,
    },
  });
};
module.exports = {
  importProduct,
  exportProduct,
  getAllModelName,
};
