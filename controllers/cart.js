const cloudinary = require("../middleware/cloudinary");
const checkout = require("../models/Product")
let cart = []

module.exports = {
    getCart: (req, res) => {
        //Retrieving the items in user's cart by ID and loading them
        //Test for now
        res.json(cart)
    },

    addProduct: async (req, res) => {
        //Grabbing the item's ID by request and incrementing the user's count by 1
        cart.push(req.params.id)
        res.json(cart)
    },

    deleteProduct: async (req, res) => {
        //Grabbing the item's ID and matching that one from the user's cart and deducting the count by 1
    }
}