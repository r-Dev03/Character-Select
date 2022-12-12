const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const cartController = require("../controllers/cart");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", cartController.getCart);

module.exports = router;