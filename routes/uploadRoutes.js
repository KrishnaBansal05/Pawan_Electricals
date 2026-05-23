const express = require("express");
const { uploadImage } = require("../controllers/uploadController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, upload.single("image"), uploadImage);

module.exports = router;
