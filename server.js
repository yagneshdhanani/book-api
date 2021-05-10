const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const bookRouter = require("./routes/book");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("DB is on"));

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/books", bookRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
