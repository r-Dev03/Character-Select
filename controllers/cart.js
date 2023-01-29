const cloudinary = require("../middleware/cloudinary");
const checkout = require("../models/Product")
const mongoose = require("mongoose");
const User = require("../models/User");
const { ObjectId } = require("mongodb");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

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
            // const cart = await Cart.findOneAndUpdate({userId : req.user.id}, 
            //   {$push: { items: {id: currentProduct.id, name: currentProduct.name, img: currentProduct.image, qty: 1} }})
            // let foundProduct = userCart.find(el => el.id == currentProduct.id)

            //Iterating through user shopping cart to find a matching Product ID

            //-------------------------------------------------------
            // if (req.user.shoppingCart.some(e => e.id === currentProduct.id)) {
                //Iterating through User's Shopping Cart to verify if currently selected item already exists, if so increment the quantity property by 1
                // const foundProduct = req.user.shoppingCart.findIndex(el => el.id === currentProduct.id)
            //     try {
            //       await User.findOneAndUpdate(
            //         { _id: req.user._id, shoppingCart: { '$elemMatch': { id: currentProduct.id } } },
            //         {'$inc': { 'shoppingCart.$.quantity': 1 }},
            //       );
            //         console.log("Quantity +1");
            //       } catch (err) {
            //         console.log(err);
            //       }
            // //if current product does not exist in user shopping cart add it on
            // } else {
            //     req.user.shoppingCart.push({
            //         id: new ObjectId(currentProduct.id),
            //         quantity: 1,
            //     });
            //     await req.user.save()
            // }

        // console.log(req.body)
        res.redirect(req.get('referer'));
    },

    deleteProduct: async (req, res) => {
        //Grabbing the item's ID and matching that one from the user's cart and deducting the quanitity by 1 - if quantity reaches 0 remove product entirely
        const currentProducts = await Product.findOne({_id: req.body.productIdFromJSFile})
        console.log(currentProducts)
        // res.json("yes")
        try {
            const productToDelete = await Cart.findOne({userId: req.user.id, items: {'$elemMatch': { id: currentProducts.id}}})
            console.log(productToDelete)
                // await Cart.findOneAndUpdate(
                //   {userId: req.user.id, items: {'$elemMatch': { id: currentProduct.id}}},
                //   {'$inc': { 'items.$.qty': -1 }})
                //   console.log("Decreasing the quantity by -1")
            }
           
        catch(err) {
          console.log(err)
        }
    }
}