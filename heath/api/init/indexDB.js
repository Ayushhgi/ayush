const mongoose = require("mongoose");
const initData = require('./data.js');
const Listing = require("../models/listing.js");
const URI = " mongodb://127.0.0.1:27017/heathCare";
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

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initlized");
};

initDB();

module.exports = connectDb;
