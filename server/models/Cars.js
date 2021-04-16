const { Schema, model } = require("mongoose");

const schema = new Schema({
  mark: { type: String },
  model: { type: String },
  year: { type: String },
  price: { type: Number },
  name: { type: String },
  phone: { type: String },
  accepted: { type: Boolean },
  date: { type: Number },
});

module.exports = model("Car", schema);
