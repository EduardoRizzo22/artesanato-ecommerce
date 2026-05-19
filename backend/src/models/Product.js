const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userName: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  rating: {
    type: Number,
    default: 5
  },
  reviews: [reviewSchema]
});

module.exports = mongoose.model("Product", productSchema);