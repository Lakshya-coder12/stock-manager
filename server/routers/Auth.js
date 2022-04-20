const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { checkSignup, checkLogin } = require("../middleware/authMiddleware");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
  return jwt.sign(
    { user },
    "my-32-character-ultra-secure-and-ultra-long-secret",
    {
      expiresIn: maxAge,
    }
  );
};

router.post(
  "/signup",
  body("name").trim().isString().withMessage("Name should be of type string"),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email provided is not valid."),
  body("password")
    .trim()
    .isString()
    .withMessage("Password should be of type string.")
    .isLength({ min: 8 })
    .withMessage("Password should be of minimum length 8"),
  async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findOne({ email: email });
      if (user) {
        throw new String("User already exists");
      }
      if (password !== confirmPassword) {
        throw new String(
          "Confirm password value must be same as that of password."
        );
      }
      const newUser = await User.create({ name, email, password });
      const token = createToken(newUser);
      console.log(token);
      const data = { ...newUser._doc, token };
      res.json(data);
    } catch (err) {
      res.status(400).send("Error: " + err);
    }
  }
);

router.post(
  "/login",
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email provided is not valid."),
  body("password")
    .trim()
    .isString()
    .withMessage("Password should be of type string.")
    .isLength({ min: 8 })
    .withMessage("Password should be of minimum length 8"),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await User.findOne({ email: email });
      // const user = await User.findOne({
      //   $and: [{ email: email }, { password: password }],
      // });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!user) {
        throw new String("User not registered");
      } else if (!isPasswordValid) {
        throw new String("Incorrect Password");
      } else {
        const token = createToken(user);
        const data = { ...user._doc, token };
        res.send(data);
      }
    } catch (err) {
      res.status(400).send("Error: " + err);
    }
  }
);

module.exports = router;
