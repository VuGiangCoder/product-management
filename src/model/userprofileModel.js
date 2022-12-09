var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userprofileSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    userid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userrole: {
      type: String,
      require: true,
      enum: ["admin", "service", "authorized_dealer", "factory", "customer"],
    },
    address: {
      type: String,
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
module.exports = mongoose.model("userprofiles", userprofileSchema);
