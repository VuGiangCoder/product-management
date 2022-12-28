var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const producthistorySchema = new mongoose.Schema(
  {
    userinid: {
      type: String,
      required: true,
    },
    useroutid: {
      type: String,
      required: true,
    },
    modelname: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    status: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updatedAt",
    },
  }
);
module.exports = mongoose.model("producthistorys", producthistorySchema);
