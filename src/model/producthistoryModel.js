var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const producthistorySchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    userid: {
      type: String,
      required: true,
    },
    modelname: {
      type: String,
      required: true,
    },
    userrole: {
      type: String,
      require: true,
      enum: ["admin", "service", "authorized_dealer", "factory", "customer"],
    },
    inout: {
      type: String,
      require: true,
      enum: ["in", "out"],
    },
    quantity: {
      type: Number,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
      default: 0,
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
