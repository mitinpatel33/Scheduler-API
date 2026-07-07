const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  saveAvailability,
  generateBookingLink
} = require("../controllers/availability.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Availability
 *   description: User availability APIs
 */


/**
 * @swagger
 * /availability:
 *   post:
 *     summary: Save user availability
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - startTime
 *               - endTime
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2026-07-07"
 *               startTime:
 *                 type: string
 *                 example: "10:00"
 *               endTime:
 *                 type: string
 *                 example: "12:00"
 *     responses:
 *       201:
 *         description: Availability saved successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, saveAvailability);

/**
 * @swagger
 * /availability/generate-link:
 *   post:
 *     summary: Generate public booking link
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Booking link generated successfully
 *       200:
 *         description: Booking link already generated
 *       401:
 *         description: Unauthorized
 */
router.post("/generate-link", authMiddleware, generateBookingLink);

module.exports = router;