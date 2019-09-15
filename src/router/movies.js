const express = require("express");
const {
  getMovies,
  getMovie,
  saveMovie,
  deleteMovie,
  updateMovie,
  getLanguages,
  getGenres
} = require("../dao/movies");
const { getReviews, addReview } = require("../dao/reviews");
const { movieSchema, reviewSchema } = require("../utils/joiSchema");
const { utils } = require("../utils/utils");
const logger = require("../startup/loggerConfig");
const router = express.Router();
const { authenticate } = require("../security/authentication");

router.get("/languages", async (req, res) => {
  logger.info("Get all languages...");
  const movies = await getLanguages();
  res.send(movies);
});

router.get("/genres", async (req, res) => {
  logger.info("Get all genres...");
  const movies = await getGenres();
  res.send(movies);
});

router.get("/", async (req, res) => {
  logger.info("Get all movies...");
  const movies = await getMovies();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  logger.debug(`Fetch Movie with id : ${req.params.id}`);
  const movie = await getMovieInfoById(req.params.id);
  res.send(movie);
});

router.post("/", async (req, res) => {
  logger.info("Add Movie");
  const { error } = utils.validate(req.body, movieSchema);
  if (error) return res.status(400).send(error.message);

  await saveMovie(req.body);
  //const movies = await getMovies();
  res.send("Done");
});

router.post("/review", async (req, res) => {
  logger.info("Add Movie");
  const { error } = utils.validate(req.body, reviewSchema);
  if (error) return res.status(400).send(error.message);

  await addReview(req.body);
  const movie = await getMovieInfoById(req.body.movieId);
  res.send(movie);
});

router.delete("/:id", authenticate, async (req, res) => {
  logger.info("Delete Movie");
  await deleteMovie(req.params.id);

  const movies = await getMovies();
  res.send(movies);
});

router.put("/", authenticate, async (req, res) => {
  logger.info("Update Movie");
  const { error } = utils.validate(req.body, movieSchema);
  if (error) return res.status(400).send(error.message);

  const result = await updateMovie(req.body);
  res.send(result);
});

const getMovieInfoById = async id => {
  const movie = await getMovie(id);
  const reviews = await getReviews(id);
  movie[0].reviews = reviews;
  return movie;
};

module.exports = router;
