const User = require("../models/user");

module.exports = {
  checkSignup: async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        throw new String("User already present.");
      }
      if (password != confirmPassword) {
        throw new String("Password and confirmPassword should be same.");
      }
      next();
    } catch (err) {
      next(err);
    }
  },
  checkLogin: async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const userData = await User.findOne({ email: email });
      if (!userData) {
        throw new String("User not registered");
      } else if (userData.password !== password) {
        throw new String("Password does not match");
      }
    } catch (err) {
      throw new String(err);
    } finally {
      next();
    }
  },
};
