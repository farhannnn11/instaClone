const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username must be required"],
    unique: [true, "username must be unique"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select:false
  },
  pfp: {
    type: String,
    default: "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg",
  },
  bio: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
