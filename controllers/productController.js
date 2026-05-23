const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");

const buildProductFilters = async (query) => {
  const filters = {};

  if (query.search) {
    filters.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { brand: { $regex: query.search, $options: "i" } },
      { shortDescription: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.category) {
    const category = await Category.findOne({
      $or: [{ slug: query.category }, { name: query.category }],
    });

    filters.category = category ? category._id : query.category;
  }

  if (query.featured === "true") {
    filters.featured = true;
  }

  if (query.minPrice || query.maxPrice) {
    filters.price = {};

    if (query.minPrice) {
      filters.price.$gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      filters.price.$lte = Number(query.maxPrice);
    }
  }

  return filters;
};

const buildSortOption = (sortBy) => {
  switch (sortBy) {
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    case "popular":
      return { rating: -1, createdAt: -1 };
    case "latest":
      return { createdAt: -1 };
    default:
      return { featured: -1, createdAt: -1 };
  }
};

const getProducts = asyncHandler(async (req, res) => {
  const filters = await buildProductFilters(req.query);
  const sort = buildSortOption(req.query.sort);

  const products = await Product.find(filters).populate("category").sort(sort);

  res.json({
    success: true,
    count: products.length,
    data: products,
  });
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
  const product = await Product.findOne(query).populate("category");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json({
    success: true,
    data: product,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    category,
    brand,
    price,
    stock,
    shortDescription,
    description,
    rating,
    featured,
  } = req.body;

  if (!name || !image || !category || !price || !shortDescription || !description) {
    res.status(400);
    throw new Error("Missing required product fields");
  }

  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    res.status(400);
    throw new Error("Invalid category");
  }

  const product = await Product.create({
    name,
    image,
    category,
    brand,
    price,
    stock,
    shortDescription,
    description,
    rating,
    featured,
  });

  const populatedProduct = await product.populate("category");

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: populatedProduct,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const nextCategory = req.body.category || product.category;
  const existingCategory = await Category.findById(nextCategory);

  if (!existingCategory) {
    res.status(400);
    throw new Error("Invalid category");
  }

  Object.assign(product, req.body);
  await product.save();
  await product.populate("category");

  res.json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
});

module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
