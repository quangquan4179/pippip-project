const mongoose = require("mongoose");
const UserProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
});
module.exports = UserProfile = mongoose.model("userProfile", UserProfileSchema);
