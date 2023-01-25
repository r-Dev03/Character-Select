const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const productController = require("../controllers/product");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Top Routes - simplified for now
router.get("/", productController.getProduct);


module.exports = router;