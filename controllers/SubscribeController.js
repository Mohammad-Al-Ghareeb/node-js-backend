const asyncHandler = require("express-async-handler");
const { Subscribers } = require("../models/Subscribers");

const getAllSubscribers = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const limit = 9;
  if (page) {
    const subscribers = await Subscribers.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(subscribers);
  } else {
    const subscribers = await Subscribers.find();
    res.status(200).json(subscribers);
  }
});

const createSubscriber = asyncHandler(async (req, res) => {
  const subscriber = new Subscribers({
    name: req.body.name,
    numberOfSubscribes: req.body.numberOfSubscribes,
    dateOfSubscribes: req.body.dateOfSubscribes,
  });

  const result = await subscriber.save();
  res.status(201).json(result);
});

const deleteSubscriber = asyncHandler(async (req, res) => {
  const subscriber = Subscribers.findById(req.params.id);
  if (subscriber) {
    await Subscribers.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "subscribers has been deleted" });
  } else {
    res.status(404).json({ message: "subscribers not found" });
  }
});

module.exports = {
  getAllSubscribers,
  createSubscriber,
  deleteSubscriber,
};
