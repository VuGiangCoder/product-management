var mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
mongoose.Promise = global.Promise;
autoIncrement.initialize(mongoose.connection);
const userSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
      unique: true,
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
      enum: ["admin", "service", "store", "factory", "customer"],
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
userSchema.plugin(autoIncrement.plugin, {
  model: "users",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});

module.exports = mongoose.model("users", userSchema);
