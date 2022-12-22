var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const producthistorySchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
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
    inout: {
      type: String,
      require: true,
      enum: ["in", "out"],
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
