const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");

module.exports = {
    getSupport: async (req, res) => {
      try{
        const cart = await getCart(req.user._id)
        res.render("support.ejs", {user: req.user, userCart: cart.items});
      }    
      catch(err){
        console.log(err)
      }
  },
};