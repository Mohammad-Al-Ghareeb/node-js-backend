const asyncHandler = require("express-async-handler");
const {
  validateCreateBook,
  validateUpdateBook,
  Book,
} = require("../models/Book");

const getAllBooks = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  let books;
  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }
  res.status(200).json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author", [
    "_id",
    "firstName",
    "lastName",
  ]);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

const createBook = asyncHandler(async (req, res) => {
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
});

const updateBook = asyncHandler(async (req, res) => {
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
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = Book.findById(req.params.id);
  if (book) {
    await Book.findOneAndDelete(req.params.id);
    res.status(200).json({ message: "book has been deleted" });
  } else {
    res.status(404).json({ message: "book not found" });
  }
});

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
