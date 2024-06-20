const mongoose = require("mongoose");

const ReadSchema = new mongoose.Schema({
  chapter1: {
    content: {
      type: String,
    },
    url: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
  },
  chapter2: {
    content: {
      type: String,
    },
    url: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
  },
  chapter3: {
    content: {
      type: String,
    },
    url: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
  },
  chapter4: {
    content: {
      type: String,
    },
    url: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
  },
  chapter5: {
    content: {
      type: String,
    },
    url: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
  },
  title: {
    type: String,
  },
  from: {
    type: String,
  },
  noti: {
    type: Boolean,
  },
  URL: {
    type: String,
  },
  imgURL: {
    type: String,
  },
});

module.exports = Read = mongoose.model("Read", ReadSchema);
