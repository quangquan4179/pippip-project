const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log("mongoDB connected");
  } catch (error) {
    console.error(err.message);
    //exxit process
    process.exit(1);
  }
};
module.exports = connectDB;