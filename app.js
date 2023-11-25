const express = require("express");
const logger = require("./middlewares/logger");
const { notFound, errorHandle } = require("./middlewares/errors");
require("dotenv").config();
const connectToDb = require("./config/db");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");

connectToDb();

const app = express();

app.use(express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

app.set("view engine", "ejs");

app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/settings", require("./routes/settings"));
app.use("/password", require("./routes/password"));
app.use("/api/subscribers", require("./routes/subscribers"));

app.use(notFound);
app.use(errorHandle);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is running");
});
