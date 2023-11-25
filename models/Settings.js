const mongoose = require("mongoose");
const Joi = require("joi");
const SettingsSchema = new mongoose.Schema(
  {
    firstTitle: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    secondTitle: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", SettingsSchema);

const validateUpdateSettings = (obj) => {
  const schema = Joi.object({
    firstTitle: Joi.string().trim().min(3),
    secondTitle: Joi.string().trim().min(3),
  });

  return schema.validate(obj);
};

module.exports = {
  Settings,
  validateUpdateSettings,
};
