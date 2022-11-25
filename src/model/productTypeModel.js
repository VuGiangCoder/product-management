var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const productTypeSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,

  type: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("producttypes", productTypeSchema);
