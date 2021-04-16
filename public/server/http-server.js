const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const formRoutes = require('./routes/formRoutes');
const carsRoutes = require('./routes/cars');

// Headers
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(formRoutes);
app.use(carsRoutes);


module.exports = app;
