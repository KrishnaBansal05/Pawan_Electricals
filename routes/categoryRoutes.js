const express = require("express");
const { createCategory, getCategories } = require("../controllers/categoryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getCategories).post(protect, adminOnly, createCategory);

module.exports = router;
