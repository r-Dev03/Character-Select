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
        res.json(req.user.shoppingCart)
    },

    addProduct: async (req, res) => {
        //Grabbing the item's ID by request and incrementing the user's count by 1
        const ownsProdcut = req.user.shoppingCart.some(product => {
            product.ObjectId == ''
        })

        const currentProduct = Product.find(
            {name : `${req.body.name}`}, {size : `${req.body.size}`}).lean()
            console.log(currentProduct)
        req.user.shoppingCart.push({
            id: new ObjectId('63ad232679ffa233cec0298d'),
            quantity: 1,
          });
          await req.user.save()
        // console.log(req.body)
        res.redirect(req.get('referer'));
    },

    deleteProduct: async (req, res) => {
        //Grabbing the item's ID and matching that one from the user's cart and deducting the count by 1
    }
}