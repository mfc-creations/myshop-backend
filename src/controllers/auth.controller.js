const validator = require("validator");
const authService = require("../services/auth.service");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { message: "Email or password is not provided" };
      }
      if (!validator.isEmail(email)) {
        throw { message: "Email not valid" };
      }
      const data = await authService.signup({ email, password });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { message: "Email or password is not provided" };
      }
      if (!validator.isEmail(email)) {
        throw { message: "Email not valid" };
      }
      const data = await authService.login({ email, password });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
