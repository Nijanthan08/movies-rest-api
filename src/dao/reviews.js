var sql = require("mssql");
var {
  QUERY_REVIEWS_BY_MOVIEID,
  insertReview,
  QUERY_RATING_BY_MOVIEID,
  insertRating,
  updtRating
} = require("../utils/query");

const getReviews = async movieId => {
  const result = await new sql.Request()
    .input("movieId", sql.Int, movieId)
    .query(QUERY_REVIEWS_BY_MOVIEID);

  return result.recordset;
};

const addReview = async review => {
  const query = insertReview(review);
  await new sql.Request().query(query);
  const ratings = await getRating(review.movieId);
  if (0 === ratings.length) {
    await addRating(review.movieId, review.likeMovie);
  } else {
    await updateRating(review.movieId, review.likeMovie);
  }
};

const getRating = async movieId => {
  const result = await new sql.Request()
    .input("movieId", sql.Int, movieId)
    .query(QUERY_RATING_BY_MOVIEID);

  return result.recordset;
};

const addRating = async (id, like) => {
  await new sql.Request().query(insertRating(id, like));
};

const updateRating = async (id, like) => {
  await new sql.Request().query(updtRating(id, like));
};

module.exports = { getReviews, addReview };
