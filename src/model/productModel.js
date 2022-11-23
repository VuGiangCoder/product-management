var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date_of_manufacture: {
    type: Date, //YYYY-MM-DD
    require: true,
  },
  quarranty_period: {
    type: Number, //Month
    require: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  color: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  hight: {
    type: Number,
    require: true,
  },
  status: {
    type: Number,
    require: true,
    default: 1,
  },
  local: {
    type: String,
    require: true,
    default: "factory",
  },
});
module.exports = mongoose.model("products", productSchema);
