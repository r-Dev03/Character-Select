const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");

module.exports = {
  getIndex: async (req, res) => {
    console.log(req.user)
    console.log(getCart)
    if(req.user) {
      const cart = await getCart(req.user._id)
      console.log(cart.items)
      res.render("index.ejs", {user: req.user, userCart: cart.items});
    } else {
      res.render("index.ejs", {user: "Guest", userCaart: []})
    }
    
 

  },
};
