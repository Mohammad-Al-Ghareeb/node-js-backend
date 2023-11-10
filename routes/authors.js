const express = require("express");
const asyncHandler = require("express-async-handler");

const {
  Author,
  authorsCreateValidation,
  authorsUpdatedValidation,
} = require("../models/Authors");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authors = await Author.find();
    res.status(200).json(authors);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  })
);

router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = authorsCreateValidation(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await author.save();
    res.status(201).json(result);
  })
);

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { error } = authorsUpdatedValidation(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          image: req.body.image,
        },
      },
      { new: true }
    );

    res.status(200).json(author);
  })
);

router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "author has been deleted" });
    } else {
      res.status(404).json({ message: "author not found" });
    }
  })
);

module.exports = router;
