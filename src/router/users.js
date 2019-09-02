const express = require("express");
const { userSchema } = require("../utils/joiSchema");
const { utils } = require("../utils/utils");
const { saveUser, fetchUserByEmailId } = require("../dao/users");
const logger = require("../startup/loggerConfig");
const bcrypt = require("bcrypt");

const _ = require("lodash");
const router = express.Router();

router.post("/", async (req, res) => {
  logger.info("Create user");
  const { error } = utils.validate(req.body, userSchema);
  if (error) return res.status(400).send(error.message);

  const user = req.body;
  user.password = await utils.encrypt(user.password);
  await saveUser(user);

  const userObj = await fetchUserByEmailId(user.emailId);
  res.send(
    _.pick(userObj, ["id", "firstName", "lastName", "emailId", "admin"])
  );
});

router.post("/login", async (req, res) => {
  logger.info("Login user");
  const userObj = await fetchUserByEmailId(req.body.emailId);
  const authenticationSuccess = await bcrypt.compare(
    req.body.password,
    userObj.password
  );

  if (!authenticationSuccess)
    return res.status(403).send("Invalid Credentials");

  res.send(
    _.pick(userObj, ["id", "firstName", "lastName", "emailId", "admin"])
  );
});

module.exports = router;
