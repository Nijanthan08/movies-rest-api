var sql = require("mssql");
const logger = require("./loggerConfig");
const config = require("config");

// config for your database
var dbConfig = {
  server: config.get("databaseServerName"),
  database: config.get("databaseName"),
  user: config.get("databaseUserId"),
  password: config.get("databasePassword"),
  options: {
    encrypt: true
  }
};

module.exports = sql.connect(dbConfig, err => {
  if (err) console.log(err);
  else logger.info("Connected to Database...");
});
