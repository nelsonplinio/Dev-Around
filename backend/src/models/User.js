const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const UserSchema = mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  bio: String,
  avatar_url: String,
  password: {
    type: String,
    required: true
  },
  techs: [String],
  location: {
    type: PointSchema,
    index: "2dsphere"
  }
});



module.exports = mongoose.model("User", UserSchema);
