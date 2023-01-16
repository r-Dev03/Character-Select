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
          ref: "Product"
        },
        name: {
            type: String,
            required: true,
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
    createdAt: Date.now(),
    updatedAt: Date.now()
  })

  module.exports = mongoose.model("Cart", CartSchema);