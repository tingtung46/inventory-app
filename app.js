const express = require("express");
const path = require("node:path");
const app = express();
const indexRouter = require("./routes/indexRouter");
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(assetsPath));

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(3000);
