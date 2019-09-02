const Joi = require("joi");
const bcrypt = require("bcrypt");

async function encrypt(value) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(value, salt);
}

function validate(obj, schema) {
  return Joi.validate(obj, schema);
}

exports.utils = { validate, encrypt };
