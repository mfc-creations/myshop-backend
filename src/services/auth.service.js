const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  signup: async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.User.create(
      { email: data.email, password: hashedPassword },
      { returning: true }
    );
    const auth_token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      "secret",
      {
        expiresIn: "1d",
      }
    );
    newUser.auth_token = auth_token;
    return { user: newUser, auth_token };
  },

  login: async (data) => {
    const user = await db.User.findOne({ where: { email: data.email } });
    if (!user) throw { message: "User not found" };
    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw { message: "Password not correct" };
    const auth_token = jwt.sign({ id: user.id, email: user.email }, "secret", {
      expiresIn: "1d",
    });
    return { user, auth_token };
  },
};
