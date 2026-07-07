const AvailabilityModel = require("../models/Availability.model");
const BookingModel = require("../models/Booking.model");
const BookingLinkModel = require("../models/BookingLink.model");
const generateSlots = require("../utils/generateSlots");

exports.getPublicBookingDetails = async (req, res) => {
  try {
    const { slug } = req.params;

    const bookingLink = await BookingLinkModel.findOne({
      slug,
      isActive: true,
    }).populate("userId", "name email");

    if (!bookingLink) {
      return res.status(404).json({ message: "Booking link not found" });
    }

    const today = new Date().toISOString().slice(0, 10);

    const availability = await AvailabilityModel.find({
      userId: bookingLink.userId._id,
      date: { $gte: today },
    }).sort({ date: 1 });

    return res.json({
      host: {
        name: bookingLink.userId.name,
        email: bookingLink.userId.email,
      },
      dates: availability,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getSlotsByDate = async (req, res) => {
  try {
    const { slug } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const bookingLink = await BookingLinkModel.findOne({
      slug,
      isActive: true,
    });

    if (!bookingLink) {
      return res.status(404).json({ message: "Booking link not found" });
    }

    const availabilityList = await AvailabilityModel.find({
      userId: bookingLink.userId,
      date,
    });

    let allSlots = [];

    availabilityList.forEach((item) => {
      const slots = generateSlots(item.startTime, item.endTime, 30);
      allSlots = [...allSlots, ...slots];
    });

    const bookings = await BookingModel.find({
      bookingLinkId: bookingLink._id,
      date,
    });

    const bookedKeys = bookings.map(
      (booking) => `${booking.startTime}-${booking.endTime}`,
    );

    const availableSlots = allSlots.filter(
      (slot) => !bookedKeys.includes(`${slot.startTime}-${slot.endTime}`),
    );

    return res.json({
      date,
      slots: availableSlots,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { slug } = req.params;
    const { date, startTime, endTime, visitorName, visitorEmail } = req.body;

    if (!date || !startTime || !endTime || !visitorName || !visitorEmail) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const bookingLink = await BookingLinkModel.findOne({
      slug,
      isActive: true,
    });

    if (!bookingLink) {
      return res.status(404).json({ message: "Booking link not found" });
    }

    const booking = await BookingModel.create({
      bookingLinkId: bookingLink._id,
      userId: bookingLink.userId,
      date,
      startTime,
      endTime,
      visitorName,
      visitorEmail,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This slot is already booked" });
    }

    return res.status(500).json({ message: error.message });
  }
};
