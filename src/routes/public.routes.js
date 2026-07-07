const express = require("express");
const { getPublicBookingDetails, getSlotsByDate, createBooking } = require("../controllers/publicBooking.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Public Booking
 *   description: Public booking APIs
 */


/**
 * @swagger
 * /public-booking/{slug}:
 *   get:
 *     summary: Get public booking details
 *     tags: [Public Booking]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: abc123xyz
 *     responses:
 *       200:
 *         description: Public booking details
 *       404:
 *         description: Booking link not found
 */
router.get("/:slug", getPublicBookingDetails);

/**
 * @swagger
 * /public-booking/{slug}/slots:
 *   get:
 *     summary: Get available slots by date
 *     tags: [Public Booking]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: abc123xyz
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         example: "2026-07-07"
 *     responses:
 *       200:
 *         description: Available slots
 *       404:
 *         description: Booking link not found
 */
router.get("/:slug/slots", getSlotsByDate);

/**
 * @swagger
 * /public-booking/{slug}/book:
 *   post:
 *     summary: Create public booking
 *     tags: [Public Booking]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: abc123xyz
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
 *               - visitorName
 *               - visitorEmail
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2026-07-07"
 *               startTime:
 *                 type: string
 *                 example: "10:00"
 *               endTime:
 *                 type: string
 *                 example: "10:30"
 *               visitorName:
 *                 type: string
 *                 example: Client One
 *               visitorEmail:
 *                 type: string
 *                 example: client@test.com
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       409:
 *         description: Slot already booked
 */
router.post("/:slug/book", createBooking);

module.exports = router;