const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const userRouter = require("./api/user/index");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", userRouter);
app.get("/", (req, res) => res.send("hello world"));

module.exports = app;
