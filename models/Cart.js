const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema( {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        name: {
            type: String,
            required: true,
          },
        size: {
            type: String, 
            require: true,
          },
        img: {
            type: String,
            require: true,
          },
        qty: {
            type: Number,
            require: true,
          },
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })

  module.exports = mongoose.model("Cart", CartSchema);