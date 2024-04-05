const mongoose = require("mongoose");
const { array } = require("zod");
const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

const UserScore = mongoose.model("UserScore", {
  username: {
    type: String,
    required: true
  },
  todayscore: {
    type: Array,
    required: true,
    items: {
      type: Object
    }
  },
  scores: {
    type: Array,
    required: true,
    items: {
      type: Object
    }
  }
});


module.exports = { User, UserScore };

