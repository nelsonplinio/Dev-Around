const User = require("../models/User");
module.exports = {
  async show(req, res) {
    const { userId } = req;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.json(user);
  },
  async update(req, res) {}
};
