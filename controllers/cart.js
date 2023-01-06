const cloudinary = require("../middleware/cloudinary");
const checkout = require("../models/Product")
const mongoose = require("mongoose");
const User = require("../models/User");
const { ObjectId } = require("mongodb");
const Product = require("../models/Product");

module.exports = {
    getCart: (req, res) => {
        //Retrieving the items in user's cart by ID and loading them
        //Test for now
        // console.log(req.user)
        res.json("got cart")
    },

    addProduct: async (req, res) => {
        //Grabbing the item's ID by request and incrementing the user's count by 1
   
            const currentProduct = await Product.findOne({name : req.body.name, size : req.body.size})

            //Iterating through user shopping cart to find a matching Product ID
            if (req.user.shoppingCart.some(e => e.id === currentProduct.id)) {
                console.log("Added 1")
            //if current product does not exist in user shopping cart add it on
            } else {
                req.user.shoppingCart.push({
                    id: new ObjectId(currentProduct.id),
                    quantity: 1,
                });
                await req.user.save()
            }

        // console.log(req.body)
        res.redirect(req.get('referer'));
    },

    deleteProduct: async (req, res) => {
        //Grabbing the item's ID and matching that one from the user's cart and deducting the count by 1
    }
}