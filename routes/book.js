const express = require("express");
const Book = require("../models/book");

const router = express.Router();

// All books routes
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// Specific book routes
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.send(book);
  } catch (error) {
    res.status(404).send({ error: "Book not found" });
  }
});

// Add book routes
router.post("/add", async (req, res) => {
  const { title, author, pubDate, edition, type } = req.body;

  const book = new Book({
    title: title,
    author: author,
    pubDate: new Date(pubDate),
    edition: edition,
    type: type,
  });

  try {
    const response = await book.save();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error: "Unable to saved book" });
  }
});

// Update book routes
router.put("/:id", async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);

    book.title = req.body.title;
    book.author = req.body.author;
    book.pubDate = new Date(req.body.pubDate);
    book.edition = req.body.edition;
    book.type = req.body.type;

    await book.save();
    res.send(book);
  } catch (error) {
    if (!book) {
      res.status(404).send({ error: "Book not found!" });
    }
    res.status(400).send({ error: error.errors });
  }
});

// Delete book routes
router.delete("/:id", async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    await book.remove();
    res.send({ message: "Book successfully deleted" });
  } catch (error) {
    if (!book) {
      res.status(404).send({ error: "Book not found!" });
    }
    res.status(400).send({ error: error.errors });
  }
});

module.exports = router;
