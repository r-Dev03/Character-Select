const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");
const Product = require('../models/Product');

module.exports = {
  getProduct: async (req, res) => {
    try{
      const product = Product.findById(req.params.id)
      if(req.user){
        const cart = await getCart(req.user._id)
        res.render('product.ejs', {user: req.user, userCart: cart.items, product : product});
      }else{
        res.render('product.ejs', {user: {name: 'Anonymous'}, userCart:[], product : product});
      }
    }    
    catch(err){
      console.log(err)
    }
},
};