const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
const Service = require("./models/Service");
const ServiceBooking = require("./models/ServiceBooking");
const { categories, products, services, users } = require("./data/seedData");

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Product.deleteMany(),
    Cart.deleteMany(),
    Order.deleteMany(),
    Service.deleteMany(),
    ServiceBooking.deleteMany(),
  ]);

  const createdUsers = await User.create(users);
  const createdCategories = await Category.create(categories);

  const categoryMap = createdCategories.reduce((map, category) => {
    map[category.name] = category._id;
    return map;
  }, {});

  await Product.create(
    products.map((product) => ({
      name: product.name,
      image: product.image,
      category: categoryMap[product.categoryName],
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      shortDescription: product.shortDescription,
      description: product.description,
      rating: product.rating,
      featured: product.featured,
    }))
  );

  await Service.create(services);

  console.log("Seed completed successfully");
  console.log(`Admin login: ${createdUsers.find((user) => user.role === "admin").email} / admin123`);
  console.log(`User login: ${createdUsers.find((user) => user.role === "user").email} / user123`);

  process.exit();
};

seed().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
