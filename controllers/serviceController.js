const Service = require("../models/Service");
const ServiceBooking = require("../models/ServiceBooking");
const asyncHandler = require("../utils/asyncHandler");

const getServices = asyncHandler(async (req, res) => {
  const filters = req.query.admin === "true" ? {} : { isActive: true };
  const services = await Service.find(filters).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: services.length,
    data: services,
  });
});

const createService = asyncHandler(async (req, res) => {
  const { name, image, shortDescription, description, isActive } = req.body;

  if (!name || !image || !shortDescription || !description) {
    res.status(400);
    throw new Error("Missing required service fields");
  }

  const service = await Service.create({
    name,
    image,
    shortDescription,
    description,
    isActive,
  });

  res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: service,
  });
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  Object.assign(service, req.body);
  await service.save();

  res.json({
    success: true,
    message: "Service updated successfully",
    data: service,
  });
});

const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  await service.deleteOne();

  res.json({
    success: true,
    message: "Service deleted successfully",
  });
});

const createServiceBooking = asyncHandler(async (req, res) => {
  const { guestName, phone, address, service, serviceType, preferredDate, issueDescription } = req.body;

  if (!phone || !address || !preferredDate || !issueDescription) {
    res.status(400);
    throw new Error("Phone, address, preferred date, and problem description are required");
  }

  let resolvedServiceType = serviceType;
  let serviceId = service;

  if (service) {
    const foundService = await Service.findById(service);
    if (!foundService) {
      res.status(404);
      throw new Error("Selected service not found");
    }

    serviceId = foundService._id;
    resolvedServiceType = foundService.name;
  }

  if (!resolvedServiceType) {
    res.status(400);
    throw new Error("Service type is required");
  }

  const booking = await ServiceBooking.create({
    user: req.user?._id,
    guestName: req.user ? req.user.name : guestName,
    phone,
    address,
    service: serviceId,
    serviceType: resolvedServiceType,
    preferredDate,
    issueDescription,
  });

  res.status(201).json({
    success: true,
    message: "Service booking created successfully",
    data: booking,
  });
});

const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await ServiceBooking.find({ user: req.user._id })
    .populate("service")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await ServiceBooking.find()
    .populate("user", "name email phone")
    .populate("service")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const { bookingStatus } = req.body;
  const allowedStatuses = ["pending", "confirmed", "in-progress", "completed"];

  if (!allowedStatuses.includes(bookingStatus)) {
    res.status(400);
    throw new Error("Invalid booking status");
  }

  const booking = await ServiceBooking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  booking.bookingStatus = bookingStatus;
  await booking.save();

  res.json({
    success: true,
    message: "Booking status updated successfully",
    data: booking,
  });
});

module.exports = {
  getServices,
  createService,
  updateService,
  deleteService,
  createServiceBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
};
