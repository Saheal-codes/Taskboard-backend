const serverless = require("serverless-http");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const morgan = require("morgan");
app.use(cors());
const routes = require("./routes/routes");
app.use(bodyparser.json());
app.use(routes);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Not Found",
  });
});
app.use(morgan("tiny"));
app.get("/health", (req, res) => res.send("Server Running.."));

mongoose
  .connect(
    "mongodb+srv://saheal_codes:V_!bmDx5dBNA9.6@seriesn.qakgq.mongodb.net/taskboarddatabase"
  )
  .then(() => {
    console.log('Connected to database by the name of "taskboarddatabase"');
  })
  .catch((error) => {
    console.log("Connection failed");
    console.log(error);
  });

module.exports = app;
module.exports.handler = serverless(app);
