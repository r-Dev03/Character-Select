const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");

module.exports = {
    getTops: async (req, res) => {
      try{
        const cart = await getCart(req.user._id)
        res.render("tops.ejs", {user: req.user, userCart: cart.items});
      }    
      catch(err){
        console.log(err)
      }
  },
};