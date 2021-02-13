const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const formRoutes = require('./routes/formRoutes');

const PORT = process.env.PORT || 8000

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

app.use(formRoutes);

app.listen(PORT, async () => {
  console.log(`running Cars Landing SERVER on port ${PORT}`);
})

app.use(express.static(path.resolve(__dirname, 'public')));
