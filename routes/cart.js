const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const checkoutController = require("../controllers/cart");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", checkoutController.getCart);

module.exports = router;