const userCart = require('./cart')
const products = require('./cart')
const getCart = require('./cart')

module.exports = {
  getIndex: async (req, res) => {
    res.render("index.ejs", {user: req.user, products: products, userCart: userCart});
  },
};
