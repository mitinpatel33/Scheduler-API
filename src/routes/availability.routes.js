const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  saveAvailability,
  generateBookingLink
} = require("../controllers/availability.controller");

const router = express.Router();

router.post("/", authMiddleware, saveAvailability);
router.post("/generate-link", authMiddleware, generateBookingLink);

module.exports = router;