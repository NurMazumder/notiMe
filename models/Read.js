const mongoose = require("mongoose");

const ReadSchema = new mongoose.Schema({
  chapter1: {
    type: String,
  },
  chapter2: {
    type: String,
  },
  chapter3: {
    type: String,
  },
  chapter4: {
    type: String,
  },
  chapter5: {
    type: String,
  },
  title: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  from: {
    type: String,
  },
  noti: {
    type: Boolean,
  },
});

module.exports = User = mongoose.model("Read", ReadSchema);
