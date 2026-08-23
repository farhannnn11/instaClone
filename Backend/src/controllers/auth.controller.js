const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, password, pfp, bio } = req.body;
  const emailAlreadyExists = await userModel.findOne({ email });
  const usernameAlreadyExists = await userModel.findOne({ username });

  if (emailAlreadyExists || usernameAlreadyExists) {
    return res.status(401).json({
      message: emailAlreadyExists
        ? " This Email already exists"
        : "This username already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const users = await userModel.create({
    username: username,
    email: email,
    password: hash,
    pfp: pfp,
    bio: bio,
  });
  const token = jwt.sign(
    {
      id: users._id,
      username: users.username,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res
    .status(200)
    .json({ message: "User has registered successfully", users, token });
};

const loginController = async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await userModel.findOne({
    $or: [{ email }, { username }],
  }).select("+password");
  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }
  
  const isMatched = await bcrypt.compare(password, userExists.password);
  if (!isMatched) {
    return res.status(401).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign(
    {
      id: userExists._id,
      username: userExists.username,
    },
    process.env.JWT_SECRET_KEY,
  );

  res.cookie("token", token);

  res.status(200).json({ message: "User logged In Successfully" });
};

const getmeController = async (req, res) => {
  const userId = req.user.username;

  const user = await userModel.findOne({ username: userId });
  res.status(200).json({ message: "user fetched successfully", user });
};
module.exports = { registerController, loginController, getmeController };
