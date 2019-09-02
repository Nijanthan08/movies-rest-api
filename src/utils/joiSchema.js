const Joi = require("joi");

const movieSchema = {
  id: Joi.number().optional(),
  name: Joi.string()
    .min(1)
    .max(40)
    .required(),
  releaseYear: Joi.number().required(),
  genreId: Joi.number().required(),
  languageId: Joi.number().required(),
  story: Joi.string()
    .min(10)
    .max(200)
    .required(),
  createdBy: Joi.number().required(),
  active: Joi.string()
    .min(1)
    .max(1)
    .required()
};

const userSchema = {
  id: Joi.number().optional(),
  firstName: Joi.string()
    .min(1)
    .max(30)
    .required(),
  lastName: Joi.string()
    .min(1)
    .max(30)
    .required(),
  emailId: Joi.string()
    .min(4)
    .max(30)
    .required(),
  password: Joi.string()
    .min(8)
    .required()
};

const reviewSchema = {
  movieId: Joi.number().required(),
  createdUserId: Joi.number().optional(),
  createdUserName: Joi.string()
    .min(1)
    .max(30)
    .required(),
  likeMovie: Joi.string()
    .min(1)
    .max(1)
    .required(),
  comments: Joi.string()
    .min(4)
    .max(200)
    .required(),
  rating: Joi.number().required()
};

module.exports = { movieSchema, userSchema, reviewSchema };
