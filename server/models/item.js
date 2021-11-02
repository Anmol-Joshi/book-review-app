const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  title: String,
  author: String,
  description: String,
  pages: Number,
  publishDate: String,
  amazon: String,
  libgen: String,
  image: String,
  category: String,
  ratingSum: Number,
  totalRatings: Number,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Item', itemSchema);
