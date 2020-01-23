const jwt = require("jsonwebtoken");
const AccessToken = require("../models/AccessToken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    const accessToken = await AccessToken.findOne({ userId: decoded.id });

    if (!accessToken) {
      throw new Error();
    }
    
    req.userId = accessToken.userId;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "token invalid" });
  }
};
