const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  validateCreateBook,
  validateUpdateBook,
  Book,
} = require("../models/Book");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })
);

router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });

    const result = await book.save();
    res.status(201).json(result);
  })
);

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedBook);
  })
);

router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const book = Book.findById(req.params.id);
    if (book) {
      await Book.findOneAndDelete(req.params.id);
      res.status(200).json({ message: "book has been deleted" });
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })
);

module.exports = router;
