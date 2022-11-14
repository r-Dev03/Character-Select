const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const checkoutController = require("../controllers/checkout");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", checkoutController.getCheckout);

module.exports = router;