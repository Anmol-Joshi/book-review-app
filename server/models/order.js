const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: String,
  // sessionId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  receipt: Number,
  status: { type: String, required: true },
  razorpay_payment_id: String,
  razorpay_order_id: String,
  razorpay_signature: String,
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
});

module.exports = mongoose.model('Order', orderSchema);
