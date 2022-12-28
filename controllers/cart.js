const cloudinary = require("../middleware/cloudinary");
const checkout = require("../models/Product")
const User = require("../models/User");

module.exports = {
    getCart: (req, res) => {
        //Retrieving the items in user's cart by ID and loading them
        //Test for now
        console.log(`Here is your cart`)
        console.log(req.user)
        res.json(req.user.shoppingCart)
    },

    addProduct: async (req, res) => {
        //Grabbing the item's ID by request and incrementing the user's count by 1
        req.user.shoppingCart.set('product', '1')
        console.log(req.user.shoppingCart.get('product'))
        console.log(req.body)
        res.redirect(req.get('referer'));
    },

    deleteProduct: async (req, res) => {
        //Grabbing the item's ID and matching that one from the user's cart and deducting the count by 1
    }
}