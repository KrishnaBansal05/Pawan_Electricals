const User = require("../models/User");
const Order = require("../models/Order");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

const formatAuthResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  role: user.role,
  token: generateToken({ id: user._id, role: user.role }),
});

const signup = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists with this email");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
  });

  res.status(201).json({
    success: true,
    message: "Signup successful",
    data: formatAuthResponse(user),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    success: true,
    message: "Login successful",
    data: formatAuthResponse(user),
  });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const ordersCount = await Order.countDocuments({ user: req.user._id });

  res.json({
    success: true,
    data: {
      ...req.user.toObject(),
      ordersCount,
    },
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });

  res.json({
    success: true,
    count: users.length,
    data: users,
  });
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = role;
  await user.save();

  res.json({
    success: true,
    message: "User role updated successfully",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    },
  });
});

module.exports = {
  signup,
  login,
  getCurrentUser,
  getUsers,
  updateUserRole,
};
