const jwt = require("jsonwebtoken");

const identifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "token not found" });
  }
  let verified;
  try {
    verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return res.status(401).json({ message: "token unauthorized" });
  }

  req.user = verified;

  next();
};
module.exports = identifyUser;
