const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const cartController = require("../controllers/cart");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/addProduct", cartController.addProduct);

router.delete("/deleteProduct", cartController.deleteProduct);

module.exports = router;
