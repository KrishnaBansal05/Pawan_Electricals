const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });

  res.json({
    success: true,
    count: categories.length,
    data: categories,
  });
});

const createCategory = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Category name is required");
  }

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
    image,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

module.exports = {
  getCategories,
  createCategory,
};
