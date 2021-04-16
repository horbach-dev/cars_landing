const mongoose = require("mongoose");
const { pass } = require('./pass')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
};

const url = `mongodb+srv://horbach:${pass}@cluster0.ds5eo.mongodb.net/best-sale?retryWrites=true&w=majority`;

const dataBase = async () => {
  return mongoose
    .connect(url, options)
    .then(function () {
      console.log("MongoDB is connected");
    })
    .catch(function (err) {
      console.log(err);
    });
};

module.exports = dataBase;
