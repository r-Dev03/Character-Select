const cloudinary = require("../middleware/cloudinary");
const checkout = require("../models/Product")
const mongoose = require("mongoose");
const User = require("../models/User");
const { ObjectId } = require("mongodb");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { rawListeners } = require("../models/Product");

module.exports = {
    getCart: async (user) => {
        //Retrieving the items in user's cart by ID and loading them
        //Ideally would want to find products based on matching the product id's that exist in the user cart to retreive proper information for each product. I.E images
        try {
          const userCart = await Cart.findOne({userId : user})
          if(userCart) {
            // console.log(userCart)
            return userCart
          } else {
            console.log("could not retrieve cart")
            console.log("Creating your cart...")

            
            const cart = await Cart.create({
              userId: user,
              items:[],
            })
            console.log("Done!")
            return cart
          }
        }
        catch (err) {
          console.log(err)
        }
    },

    addProduct: async (req, res) => {
            //Using request body to locate a matching product in the Product Collection
            const currentProduct = await Product.findOne({name : req.body.name, size : req.body.size})
            const cart = await Cart.findOne({userId: req.user.id})
            console.log(cart)
            try {  
              if(cart.items.some(e => e.id == currentProduct.id)) {
                await Cart.findOneAndUpdate(
                {userId: req.user.id, items: {'$elemMatch': { id: currentProduct.id}}},
                {'$inc': { 'items.$.qty': 1 }})
                console.log("you already got this item")
                } else {
                  await Cart.findOneAndUpdate({userId : req.user.id}, 
                  {$push: { items: {id: currentProduct.id, name: currentProduct.name, size : currentProduct.size, img: currentProduct.image, qty: 1}}})
            }
          } 
            catch(err) {
              console.log(err)
            }

        // console.log(req.body
        // setTimeout(function () {
        //   res.redirect(req.get('referer'));
        // }, 1000);
        let url = req.get('referer')
        console.log(url)
        url = url.split('?').shift()
        console.log(url)
        res.redirect(url + '?success');
    },

    deleteProduct: async (req, res) => {
        //Grabbing the item's ID and matching that one from the user's cart and deducting the quanitity by 1 - if quantity reaches 0 remove product entirely
        try {
          const prod = await Cart.findOne({userId: req.user.id})
          const item = prod.items.find(el => el.id == req.body.productIdFromJSFile)
          console.log(item)
          if (item.qty == 1) {
            const newItems = prod.items.filter(el => el.id != item.id)
            await Cart.findOneAndUpdate({userId: req.user.id}, {items: newItems})
          } else {
            await Cart.findOneAndUpdate(
              {userId: req.user.id, items: {'$elemMatch': { id: req.body.productIdFromJSFile}}},
              {'$inc': { 'items.$.qty': -1 }})
              console.log("Decreasing the quantity by -1")
          }
            }
           
        catch(err) {
          console.log(err)
        }
        res.json('Winner')
    }
}