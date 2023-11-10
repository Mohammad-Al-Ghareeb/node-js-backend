const mongoose = require("mongoose");
const Joi = require("joi");
const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      minLength: 3,
      maxLength: 200,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      minLength: 3,
      maxLength: 200,
    },
    nationality: {
      type: String,
      require: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", AuthorSchema);
const authorsCreateValidation = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(2).max(100).required(),
    image: Joi.string(),
  });

  return schema.validate(obj);
};

const authorsUpdatedValidation = (obj) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(200),
    lastName: Joi.string().trim().min(3).max(200),
    nationality: Joi.string().trim().min(2).max(100),
    image: Joi.string(),
  });

  return schema.validate(obj);
};

module.exports = {
  Author,
  authorsCreateValidation,
  authorsUpdatedValidation,
};
