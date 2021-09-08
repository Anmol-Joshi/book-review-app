const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  // _id: ObjectId,
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
});

module.exports = mongoose.model('Item', itemSchema);
