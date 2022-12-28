var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ProductHistoryModel = require("../model/producthistoryModel");
const ProductseriModel = require("../model/productseriModel");
require("dotenv").config;
const crud = require("../service/crudService");

let importProduct = async (req, res) => {
  await crud.importProduct(req);
  return res.json({
    message: "thêm mặt hàng thành công",
    errCode: 0,
  });
};
let sellProduct = async (req, res) => {
  await crud.exportProduct(req);
  return res.json({
    message: "Bán mặt hàng thành công",
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
let getProductMonth = async (req, res) => {
  var month = req.body.month;
  var year = req.body.year;
};

let getProductHistory = async (req, res) => {
  crud.getProductHistory(req, res);
};
let getProductInMonth = async (req, res) => {
  await crud.getProductInMonth(req, res);
};
let getProductInYear = async (req, res) => {
  await crud.getProductInYear(req, res);
};
let getProductInQuarterly = async (req, res) => {
  await crud.getProductInQuarterly(req, res);
};
module.exports = {
  importProduct,
  getAllModelName,
  sellProduct,
  getProductMonth,
  getProductHistory,
  getProductInMonth,
  getProductInYear,
  getProductInQuarterly,
};
