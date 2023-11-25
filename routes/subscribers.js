const express = require("express");
const {
  getAllSubscribers,
  createSubscriber,
  deleteSubscriber,
} = require("../controllers/SubscribeController");

const router = express.Router();

router.route("/").get(getAllSubscribers).post(createSubscriber);
router.route("/:id").delete(deleteSubscriber);
module.exports = router;
