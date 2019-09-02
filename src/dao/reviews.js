var sql = require("mssql");
var { QUERY_REVIEWS_BY_MOVIEID, insertReview } = require("../utils/query");

const getReviews = async movieId => {
  const result = await new sql.Request()
    .input("movieId", sql.Int, movieId)
    .query(QUERY_REVIEWS_BY_MOVIEID);

  return result.recordset;
};

const addReview = async review => {
  const query = insertReview(review);
  await new sql.Request().query(query);
};

module.exports = { getReviews, addReview };
