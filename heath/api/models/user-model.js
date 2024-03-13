const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },

});

userSchema.plugin(passportLocalMongoose);

// User.pre("save", async function () {
//   console.log("pre method",this);
// });

module.exports = mongoose.model("User", userSchema);
