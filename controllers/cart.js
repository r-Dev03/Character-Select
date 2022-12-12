const cloudinary = require("../middleware/cloudinary");
const checkout = require("../models/Product")

module.exports = {
    getCart: (req, res) => {
        //Retrieving the items in user's cart by ID and loading them
    },

    addProduct: async (req, res) => {
        //Grabbing the item's ID by request and incrementing the user's count by 1
    },

    deleteProduct: async (req, res) => {
        //Grabbing the item's ID and matching that one from the user's cart and deducting the count by 1
    }
}