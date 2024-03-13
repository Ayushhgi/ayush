const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  name: {
    type: String,
    // required : true,
  },
  heathCondition: {
    type: String,
    // required : true,
  },
  image: {
    url: {
      type: String,
    },
    // required : true,
  },
  gender: {
    type: String,
    // required : true,
  },
  address: {
    type: String,
    // required : true,
  },
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
