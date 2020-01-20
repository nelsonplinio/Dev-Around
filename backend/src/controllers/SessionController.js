const User = require("../models/User");
const AccessToken = require("../models/AccessToken");
const { validatePassword } = require("../models/utils/userHashPassword");
const jwt = require("jsonwebtoken");

const TOKEN_SECRET_KEY = "8b8OB&7772lb";

module.exports = {
  async store(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }

    const { password: pwdHash } = user;

    if (!validatePassword(password, pwdHash)) {
      return res.status(401).json({ message: "password incorret" });
    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    await AccessToken.create({
      userId: user._id,
      token
    });

    return res.json({ token });
  }
};
