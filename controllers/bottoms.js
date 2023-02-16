const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");
const Product = require('../models/Product');

module.exports = {
    getBottoms: async (req, res) => {
      try{
        const bottoms = await Product.find({category: "Bottoms", size: "small"})
        if(req.user){
          const cart = await getCart(req.user._id)
          res.render('bottoms.ejs', {user: req.user, userCart: cart.items, bottoms: bottoms, req: req});
        }else{
          res.render('bottoms.ejs', {user: {name: 'Anonymous'}, userCart:[], bottoms: bottoms, req: req});
        }
      }    
      catch(err){
        console.log(err)
      }
  },
};