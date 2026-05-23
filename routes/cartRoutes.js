const express = require("express");
const { getCart, addToCart, updateCartItem, removeCartItem } = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.route("/").get(getCart).post(addToCart);
router.route("/:productId").put(updateCartItem).delete(removeCartItem);

module.exports = router;
