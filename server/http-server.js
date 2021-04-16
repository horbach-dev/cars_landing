const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const webPush = require("web-push");
const app = express();

const formRoutes = require('./routes/formRoutes');
const carsRoutes = require('./routes/cars');
const subscribeRoutes = require('./routes/subscribeRoutes');

const PUBLIC_VAPID_KEY = 'BA0BAVb28f7teA3knfaqf7Z6O8y6PS9ax2VygOQMVwu0L623wgyBqviqFz7zftqs73_w_rslVwzMoLf5ncnMheo';
const PRIVATE_VAPID_KEY = '3oOKz_UZHLD0SXjT9Ve7RaI5oeJNgF-oZ2qUfC9mRpQ';
webPush.setVapidDetails('mailto:horbach,ux@gmail.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

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
app.use(subscribeRoutes);


module.exports = app;
