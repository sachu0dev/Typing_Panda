const mongoose = require("mongoose");
const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
  },
  password: String,
  email: {
    type: String,
    required: true,
  }
});

module.exports = User;