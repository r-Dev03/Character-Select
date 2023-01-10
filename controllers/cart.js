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
        res.json("got cart")
    },

    addProduct: async (req, res) => {
            //Using request body to locate a matching product in the Product Collection
            const currentProduct = await Product.findOne({name : req.body.name, size : req.body.size})

            //Iterating through user shopping cart to find a matching Product ID
            if (req.user.shoppingCart.some(e => e.id === currentProduct.id)) {
                //Iterating through User's Shopping Cart to verify if currently selected item already exists, if so increment the quantity property by 1
                // const foundProduct = req.user.shoppingCart.findIndex(el => el.id === currentProduct.id)
                try {
                  await User.findOneAndUpdate(
                    { _id: req.user._id, shoppingCart: { '$elemMatch': { id: currentProduct.id } } },
                    {'$inc': { 'shoppingCart.$.quantity': 1 }},
                  );
                    console.log("Quantity +1");
                  } catch (err) {
                    console.log(err);
                  }
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