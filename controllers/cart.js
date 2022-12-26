const cloudinary = require("../middleware/cloudinary");
const checkout = require("../models/Product")
const User = require("../models/User");
let cart = []

module.exports = {
    getCart: (req, res) => {
        //Retrieving the items in user's cart by ID and loading them
        //Test for now
        res.json(cart)
        // res.json(req.User.cart)
    },

    addProduct: async (req, res) => {
        //Grabbing the item's ID by request and incrementing the user's count by 1
        // cart.push(req.params.id)
        // res.json(cart)
        cart.push(req.body.size)
        console.log(cart)
        res.redirect(req.get('referer'));
    },

    deleteProduct: async (req, res) => {
        //Grabbing the item's ID and matching that one from the user's cart and deducting the count by 1
    }
}