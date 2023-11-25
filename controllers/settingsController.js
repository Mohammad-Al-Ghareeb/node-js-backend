const asyncHandler = require("express-async-handler");
const { Settings, validateUpdateSettings } = require("../models/Settings");

const getAllSettings = asyncHandler(async (req, res) => {
  const users = await Settings.find();

  res.status(200).json(users);
});

const editSettings = asyncHandler(async (req, res) => {
  const { error } = validateUpdateSettings(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedSettings = await Settings.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstTitle: req.body.firstTitle,
        secondTitle: req.body.secondTitle,
      },
    },
    { new: true }
  );

  res.status(200).json(updatedSettings);
});

module.exports = {
  getAllSettings,
  editSettings,
};
