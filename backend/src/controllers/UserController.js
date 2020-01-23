const axios = require("axios");
const User = require("../models/User");
const { findConnections, sendMessage } = require("../websocket");
const { generatePasswordHash } = require("../models/utils/userHashPassword");
module.exports = {
  async store(req, res) {
    const {
      username,
      password,
      useGithubInfo,
      techs,
      latitude,
      longitude
    } = req.body;

    let user = await User.findOne({ username });

    if (user) {
      return res.status(401).json({ message: "Username used by other user." });
    }

    const getGithubInfo = async () => {
      if (useGithubInfo) {
        const { data } = await axios.get(
          `https://api.github.com/users/${username}`
        );
        const { name = login, avatar_url, bio } = data;
        return {
          bio,
          name,
          avatar_url
        };
      } else {
        return {};
      }
    };

    let location;

    if (longitude && latitude) {
      location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
    }

    const arrayTechs = (techs || "").split(",").map(tech => tech.trim());

    user = await User.create({
      username,
      password: generatePasswordHash(password),
      ...(await getGithubInfo()),
      techs: arrayTechs,
      location
    });

    // filtar as conexões
    const sendSocketMessageTo = findConnections(
      { longitude, latitude },
      arrayTechs
    );
    console.log(sendSocketMessageTo);
    sendMessage(sendSocketMessageTo, "new-user", user);

    return res.json(user);
  },

  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async show(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.json({
      ...user.toJSON(),
      password: undefined,
    });
  }
};
