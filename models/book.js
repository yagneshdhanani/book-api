const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pubDate: {
    type: Date,
    required: true,
  },
  edition: Number,
  type: {
    type: String,
    enum: ["HARD_COVER", "SOFT_COVER", "E_BOOK"],
  },
});

module.exports = mongoose.model("Book", bookSchema);
