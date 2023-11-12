const express = require("express");

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

const {
  getAllAuthors,
  getOneAuthor,
  createAuthor,
  editAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

router.get("/", getAllAuthors);

router.get("/:id", getOneAuthor);

router.post("/", verifyTokenAndAdmin, createAuthor);

router.put("/:id", verifyTokenAndAdmin, editAuthor);

router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
