var sql = require("mssql");
var {
  QUERY_ALL_MOVIES,
  QUERY_ALL_LANGUAGES,
  QUERY_ALL_GENRES,
  QUERY_MOVIE_BY_ID,
  QUERY_POPULAR_MOVIES,
  insertMovie,
  delMovie,
  updtMovie
} = require("../utils/query");
const logger = require("../startup/loggerConfig");

const getLanguages = async () => {
  const result = await new sql.Request().query(QUERY_ALL_LANGUAGES);
  return result.recordset;
};

const getGenres = async () => {
  const result = await new sql.Request().query(QUERY_ALL_GENRES);
  return result.recordset;
};

const getMovies = async () => {
  const result = await new sql.Request().query(QUERY_ALL_MOVIES);
  return result.recordset;
};

const getPopularMovies = async () => {
  const result = await new sql.Request().query(QUERY_POPULAR_MOVIES);
  return result.recordset;
};

const getMovie = async movieId => {
  const result = await new sql.Request()
    .input("movieId", sql.Int, movieId)
    .query(QUERY_MOVIE_BY_ID);
  return result.recordset;
};

const saveMovie = async movie => {
  const request = new sql.Request();

  request.input("name", sql.VarChar, movie.name);
  request.input("releaseYear", sql.Int, movie.releaseYear);
  request.input("genreId", sql.Int, movie.genreId);
  request.input("languageId", sql.Int, movie.languageId);
  request.input("story", sql.VarChar, movie.story);
  request.input("createdBy", sql.Int, movie.createdBy);
  request.input("active", sql.VarChar, movie.active);
  request.input("base64Img", sql.VarChar, movie.base64Img);
  await request.query(insertMovie);
};

const deleteMovie = async id => {
  const deleteQuery = delMovie(id);
  await new sql.Request().query(deleteQuery);
};

const updateMovie = async movie => {
  const updateQuery = updtMovie(movie);
  logger.debug(updateQuery);

  await new sql.Request().query(updateQuery);
  return await getMovie(movie.id);
};

module.exports = {
  getMovies,
  getMovie,
  saveMovie,
  deleteMovie,
  updateMovie,
  getLanguages,
  getGenres,
  getPopularMovies
};
