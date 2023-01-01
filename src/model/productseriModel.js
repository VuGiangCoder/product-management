var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const productseriSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    modelname: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    userid: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    weight: {
      type: String,
      require: true,
    },
    height: {
      type: String,
      require: true,
    },
    expiry: {
      type: Number,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "createAt",
      updatedAt: "updatedAt",
    },
  }
);
module.exports = mongoose.model("productseris", productseriSchema);
