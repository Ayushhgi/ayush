
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const URI = "mongodb://localhost:27017/heathCare";
mongoose.connect(URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

module.exports = connectDb;
