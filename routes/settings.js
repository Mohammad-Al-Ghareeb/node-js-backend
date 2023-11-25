const express = require("express");
const {
  getAllSettings,
  editSettings,
} = require("../controllers/settingsController");

const router = express.Router();

router.route("/").get(getAllSettings);
router.route("/:id").put(editSettings);

module.exports = router;
