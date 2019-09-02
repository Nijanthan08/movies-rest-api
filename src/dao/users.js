var sql = require("mssql");
var { insertUser, selectUser } = require("../utils/query");
const logger = require("../startup/loggerConfig");

const saveUser = async user => {
  const insertQuery = insertUser(user);
  logger.debug(insertQuery);
  await new sql.Request().query(insertQuery);
};

const fetchUserByEmailId = async emailId => {
  const query = selectUser(emailId);
  logger.debug(query);
  const results = await new sql.Request().query(query);
  return results.recordset[0];
};

module.exports = { saveUser, fetchUserByEmailId };
