const mongoose = require("mongoose");
const SubscribersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    numberOfSubscribes: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    dateOfSubscribes: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
  },
  { timestamps: true }
);

const Subscribers = mongoose.model("Subscribers", SubscribersSchema);

module.exports = {
  Subscribers,
};
