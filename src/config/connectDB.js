var mongoose = require("mongoose");

let connectDB = async () => {
  try {
    var uri =
      "mongodb+srv://product:giang123abc@productmanagerment.7zjdagl.mongodb.net/productmanagerment";

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
