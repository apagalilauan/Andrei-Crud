const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  dimensions: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  material: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  tags: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Item', itemSchema);
