const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    cloudinaryId: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });
  
  module.exports = mongoose.model("Product", ProductSchema);