const mongoose = require("mongoose");

const AccessTokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model("AccessToken", AccessTokenSchema);
