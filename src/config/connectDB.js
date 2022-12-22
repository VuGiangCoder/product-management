var mongoose = require("mongoose");
require("dotenv").config();
let connectDB = async () => {
  try {
    var uri = process.env.uri;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Atlas succesfull");
  } catch (error) {
    console.log(error);
    console.log("Connect false");
  }
};
module.exports = connectDB;
