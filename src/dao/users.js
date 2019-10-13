var sql = require("mssql");
var { insertUser, selectUser } = require("../utils/query");
const logger = require("../startup/loggerConfig");

const saveUser = async user => {
  const request = new sql.Request();

  request.input("firstName", sql.VarChar, user.firstName);
  request.input("lastName", sql.VarChar, user.lastName);
  request.input("emailId", sql.VarChar, user.emailId);
  request.input("password", sql.VarChar, user.password);
  await request.query(insertUser);
};

const fetchUserByEmailId = async emailId => {
  const query = selectUser(emailId);
  logger.debug(query);
  const results = await new sql.Request().query(query);
  return results.recordset[0];
};

module.exports = { saveUser, fetchUserByEmailId };
