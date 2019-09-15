const express = require("express");
var cors = require("cors");
const movies = require("../router/movies");
const users = require("../router/users");

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/movies", movies);
  app.use("/api/users", users);
};
