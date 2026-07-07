const express = require("express");
const { getPublicBookingDetails, getSlotsByDate, createBooking } = require("../controllers/publicBooking.controller");

const router = express.Router();

router.get("/:slug", getPublicBookingDetails);
router.get("/:slug/slots", getSlotsByDate);
router.post("/:slug/book", createBooking);

module.exports = router;