const cloudinary = require("../middleware/cloudinary");
const checkout = require("../models/Product")

module.exports = {
    getCheckout: (req, res) => {
      res.render("checkout.ejs");
    }
    }