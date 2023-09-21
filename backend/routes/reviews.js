const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Book = require("../models/Book");
const Review = require("../models/Review");
const verifyToken = require("../verifyToken");

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newReview = new Book(req.body);
    // console.log(req.body)
    const saveReview = await newReview.save();

    res.status(200).json(savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    //await Review.deleteMany({ bookId: req.params.id });
    res.status(200).json("Review has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/book/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
