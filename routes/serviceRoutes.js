const express = require("express");
const {
  getServices,
  createService,
  updateService,
  deleteService,
  createServiceBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/serviceController");
const { protect, adminOnly, attachUserIfExists } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getServices);
router.post("/", protect, adminOnly, createService);
router.put("/:id", protect, adminOnly, updateService);
router.delete("/:id", protect, adminOnly, deleteService);

router.post("/bookings", attachUserIfExists, createServiceBooking);
router.get("/bookings/my", protect, getMyBookings);
router.get("/bookings", protect, adminOnly, getAllBookings);
router.put("/bookings/:id/status", protect, adminOnly, updateBookingStatus);

module.exports = router;
