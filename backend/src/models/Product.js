const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  rating: {
    type: Number,
    default: 5
  }
});

module.exports = mongoose.model("Product", productSchema);