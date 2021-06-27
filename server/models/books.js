import mongoose from 'mongoose';
const { Schema } = mongoose;

const booksSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  description: String,
  ratingAndReview: [
    {
      rating: {
        required: true,
        type: Number,
        min: [0],
        max: [10],
      },
      review: String,
      date: Date,
    },
  ],
  date: { type: Date, default: Date.now },
  // hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

module.exports = mongoose.model('Books', booksSchema);
