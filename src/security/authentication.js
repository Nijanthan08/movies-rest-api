const jwt = require("jsonwebtoken");
const config = require("config");
const logger = require("../startup/loggerConfig");

const authenticate = (req, res, next) => {
  logger.info("authenticate request..");
  const authToken = req.header("X-AUTH-TOKEN");
  if (!authToken) return res.status(403).send("Token not found");

  try {
    const user = jwt.verify(authToken, config.get("jwtPrivateKey"));
    req.user = user;
    next();
  } catch (error) {
    logger.error(error);
    return res.status(403).send("Invalid Token");
  }
};

const generateToken = user => {
  return jwt.sign(user, config.get("jwtPrivateKey"));
};

module.exports = { generateToken, authenticate };
