const express = require("express");
const movies = require("../router/movies");
const users = require("../router/users");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/movies", movies);
  app.use("/api/users", users);
};
