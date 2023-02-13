const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");
const Product = require('../models/Product');

module.exports = {
  getTops: async (req, res) => {
    try{
      const tops = await Product.find({category: "Tops", size: "small"})
      if(req.user){
        const cart = await getCart(req.user._id)
        console.log(req.query)
        res.render('tops.ejs', {user: req.user, userCart: cart.items, tops: tops, req: req});
      }else{
        res.render('tops.ejs', {user: {name: 'Anonymous'}, userCart:[], tops: tops, req: req});
      }
    }    
    catch(err){
      console.log(err)
    }
},
};
