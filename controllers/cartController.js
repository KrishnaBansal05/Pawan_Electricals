const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  return cart;
};

const formatCart = (cart) => {
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = subtotal >= 1000 || subtotal === 0 ? 0 : 50;

  return {
    ...cart.toObject(),
    subtotal,
    deliveryCharge,
    total: subtotal + deliveryCharge,
  };
};

const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  await cart.populate("items.product");

  res.json({
    success: true,
    data: formatCart(cart),
  });
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const cart = await getOrCreateCart(req.user._id);
  const existingItem = cart.items.find((item) => item.product.toString() === productId);
  const requestedQuantity = Number(quantity);

  if (requestedQuantity < 1) {
    res.status(400);
    throw new Error("Quantity must be at least 1");
  }

  if (existingItem) {
    const nextQuantity = existingItem.quantity + requestedQuantity;
    if (nextQuantity > product.stock) {
      res.status(400);
      throw new Error("Requested quantity exceeds stock");
    }

    existingItem.quantity = nextQuantity;
    existingItem.price = product.price;
  } else {
    if (requestedQuantity > product.stock) {
      res.status(400);
      throw new Error("Requested quantity exceeds stock");
    }

    cart.items.push({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: requestedQuantity,
    });
  }

  await cart.save();
  await cart.populate("items.product");

  res.status(201).json({
    success: true,
    message: "Product added to cart",
    data: formatCart(cart),
  });
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await getOrCreateCart(req.user._id);
  const item = cart.items.find((cartItem) => cartItem.product.toString() === req.params.productId);

  if (!item) {
    res.status(404);
    throw new Error("Cart item not found");
  }

  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter((cartItem) => cartItem.product.toString() !== req.params.productId);
  } else {
    if (quantity > product.stock) {
      res.status(400);
      throw new Error("Requested quantity exceeds stock");
    }

    item.quantity = Number(quantity);
    item.price = product.price;
  }

  await cart.save();
  await cart.populate("items.product");

  res.json({
    success: true,
    message: "Cart updated successfully",
    data: formatCart(cart),
  });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);

  cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
  await cart.save();
  await cart.populate("items.product");

  res.json({
    success: true,
    message: "Item removed from cart",
    data: formatCart(cart),
  });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
