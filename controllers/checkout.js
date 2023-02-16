const { get } = require('mongoose');
const { getCart } = require('./cart')
const User = require("../models/User");


// module.exports = {
//     getCheckout: (req, res) => {
//       res.render("checkout.ejs");
//     }
//     }

    module.exports = {
      getCheckout: async (req, res) => {
          try{
            const cart = await getCart(req.user._id)
            res.render("checkout.ejs", {user: req.user, userCart: cart.items});
          }    
          catch(err){
            console.log(err)
          }
      },
    };
    