const express = require("express");
const logger = require("./middlewares/logger");
const { notFound, errorHandle } = require("./middlewares/errors");
require("dotenv").config();
const connectToDb = require("./config/db");

connectToDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.set("view engine", "ejs");

app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/password", require("./routes/password"));

app.use(notFound);
app.use(errorHandle);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is running");
});
