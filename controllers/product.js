const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");
const Product = require('../models/Product');

module.exports = {
  getProduct: async (req, res      ) => {
    try{
      const product =  await Product.findById(req.params.id)
      console.log(product)
      if(req.user){
        const cart = await getCart(req.user._id)
        res.render('product.ejs', {user: req.user, userCart: cart.items, product : product, req: req});
      }else{
        res.render('product.ejs', {user: {name: 'Anonymous'}, userCart:[], product : product, req: req});
      }
    }    
    catch(err){
      console.log(err)
    }
},
};
