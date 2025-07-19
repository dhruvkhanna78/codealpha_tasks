const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  description: String,
  price: {
    type: Number,
    required: true
  },
  countInStock: Number
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
