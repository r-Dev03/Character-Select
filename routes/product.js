const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const productController = require("../controllers/product");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Product Routes - simplified for now
router.get("/:id", productController.getProduct);


module.exports = router;