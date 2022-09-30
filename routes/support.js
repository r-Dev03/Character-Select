const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const supportController = require("../controllers/support");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Top Routes - simplified for now
router.get("/support", supportController.getSupport);

module.exports = router;