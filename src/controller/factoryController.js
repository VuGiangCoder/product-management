var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var ProductHistoryModel = require("../model/producthistoryModel");
const ProductseriModel = require("../model/productseriModel");

let importProduct = async (req, res) => {
  var data = jwt.verify(req.cookies.token, "bigcorpsky");
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
      modelname: modelName,
    });
    if (productserimodel == null) {
      var product = new ProductseriModel({
        modelname: modelName,
        name: name,
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

module.exports = {
  importProduct,
};
