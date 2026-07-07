const { nanoid } = require("nanoid");
const Availability = require("../models/Availability.model");
const BookingLink = require("../models/BookingLink.model");

exports.saveAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "Date, start time and end time are required" });
    }

    if (startTime >= endTime) {
      return res
        .status(400)
        .json({ message: "End time must be greater than start time" });
    }

    const availability = await Availability.create({
      userId: req.user.id,
      date,
      startTime,
      endTime,
    });

    // Requirement: frontend shows list from this save API response only
    return res.status(201).json({
      message: "Availability saved successfully",
      data: availability,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.generateBookingLink = async (req, res) => {
  try {
    const existingLink = await BookingLink.findOne({
      userId: req.user.id,
      isActive: true,
    });

    if (existingLink) {
      return res.json({
        message: "Booking link already generated",
        bookingUrl: `${process.env.CLIENT_URL}/book/${existingLink.slug}`,
        slug: existingLink.slug,
      });
    }

    const slug = nanoid(10);

    const bookingLink = await BookingLink.create({
      userId: req.user.id,
      slug,
    });

    return res.status(201).json({
      message: "Booking link generated successfully",
      bookingUrl: `${process.env.CLIENT_URL}/book/${bookingLink.slug}`,
      slug: bookingLink.slug,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
