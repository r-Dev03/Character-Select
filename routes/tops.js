const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const topsController = require("../controllers/tops");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Top Routes - simplified for now
router.get("/tops", topsController.getTops);

module.exports = router;
