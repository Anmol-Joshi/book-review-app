const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
  // _id: String,
  itemId: String,
  userId: String,
  firstName: String,
  lastName: String,
  // avatarUrl: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  review: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Review', reviewSchema);
