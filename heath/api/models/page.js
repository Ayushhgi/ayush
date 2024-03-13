const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: String,

});

const PlaceModel = mongoose.model("place", placeSchema);

module.exports = PlaceModel;
