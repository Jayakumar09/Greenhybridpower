const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.verifyToken, authMiddleware.requireCustomer, bookingController.createBooking);
router.get('/', authMiddleware.verifyToken, bookingController.getBookings);
router.get('/my-bookings', authMiddleware.verifyToken, authMiddleware.requireCustomer, bookingController.getMyBookings);
router.get('/:id', bookingController.getBooking);
router.put('/:id', authMiddleware.verifyToken, bookingController.updateBooking);

module.exports = router;