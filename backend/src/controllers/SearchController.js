const User = require("../models/User");
const parseStringAsString = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    //buscar todos os devs por um raio 10km;
    // filtrar por techs;

    const { techs, latitude,longitude} = req.query;

    console.log(req.query);
    const techsArray = parseStringAsString(techs);

    const devs = await User.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        }
      }
    });

    return res.json(devs);
  }
};
