const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({
      Error: "Unauthorized access",
    });
  }
  const token = authorization.split(" ")[1];
  const response = jwt.verify(
    token,
    "my-32-character-ultra-secure-and-ultra-long-secret"
  );
  const { _id, email } = response.user;
  const isExists = await User.findOne({ _id });
  if (!isExists) {
    res.status(401).json({
      Error: "Unauthorized access",
    });
  }
  const userData = {
    email,
    _id,
  };
  req.userInfo = userData;
  next();
  // const req.headers
};
