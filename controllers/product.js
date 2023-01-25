const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");
const Product = require('../models/Product');

module.exports = {
  getProduct: async (req, res) => {
    try{
      if(req.user){
        const cart = await getCart(req.user._id)
        res.render('product.ejs', {user: req.user, userCart: cart.items});
      }else{
        res.render('product.ejs', {user: {name: 'Anonymous'}, userCart:[]});
      }
    }    
    catch(err){
      console.log(err)
    }
},
};