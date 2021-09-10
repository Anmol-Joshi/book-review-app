const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      itemId: String,
      quantity: Number,
      title: String,
      author: String,
      description: String,
      pages: Number,
      publishDate: String,
      image: String,
      category: String,
      ratingSum: Number,
      totalRatings: Number,
      price: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  totalAmount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Cart', cartSchema);
