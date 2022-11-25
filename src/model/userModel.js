var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      enum: ["admin", "service", "authorized_dealer", "factory"],
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
module.exports = mongoose.model("users", userSchema);
