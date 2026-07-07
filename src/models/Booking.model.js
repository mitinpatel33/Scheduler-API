const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingLinkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookingLink",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: String,
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    endTime: {
      type: String,
      required: true
    },

    visitorName: {
      type: String,
      required: true
    },

    visitorEmail: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

bookingSchema.index(
  { bookingLinkId: 1, date: 1, startTime: 1, endTime: 1 },
  { unique: true }
);

module.exports = mongoose.model("Booking", bookingSchema);