const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");

module.exports = {
    getSupport: async (req, res) => {
      try{
        if(req.user){
          const cart = await getCart(req.user._id)
          res.render('support.ejs', {user: req.user, userCart: cart.items});
        }else{
          res.render('support.ejs', {user: {name: 'Anonymous'}, userCart:[]});
        }
      }    
      catch(err){
        console.log(err)
      }
  },
};