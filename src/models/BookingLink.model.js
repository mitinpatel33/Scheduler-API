const mongoose = require("mongoose");

const bookingLinkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookingLink", bookingLinkSchema);