const cloudinary = require("../middleware/cloudinary");
const checkout = require("../models/Item")

module.exports = {
    getCheckout: (req, res) => {
      res.render("checkout.ejs");
    },

    getCart: async (req, res) => {
 
    },
    }