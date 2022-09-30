const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const bottomController = require("../controllers/bottoms");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Top Routes - simplified for now
router.get("/bottoms", bottomController.getBottoms);

module.exports = router;