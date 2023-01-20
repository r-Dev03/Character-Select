const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");

module.exports = {
    getBottoms: async (req, res) => {
      try{
        const cart = await getCart(req.user._id)
        res.render("bottoms.ejs", {user: req.user, userCart: cart.items});
      }    
      catch(err){
        console.log(err)
      }
  },
};