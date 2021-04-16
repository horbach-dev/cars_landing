const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: { type: String },
  phone: { type: String },
  date: { type: Number },
});

module.exports = model("Car", schema);
