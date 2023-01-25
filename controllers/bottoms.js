const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");

module.exports = {
    getBottoms: async (req, res) => {
      try{
        // const tops = await Product.find({category: "Bottoms", size: "small"})
        if(req.user){
          const cart = await getCart(req.user._id)
          res.render('bottoms.ejs', {user: req.user, userCart: cart.items});
        }else{
          res.render('bottoms.ejs', {user: {name: 'Anonymous'}, userCart:[]});
        }
      }    
      catch(err){
        console.log(err)
      }
  },
};