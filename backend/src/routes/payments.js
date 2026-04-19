const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.verifyToken, authMiddleware.requireCustomer, paymentController.createPayment);
router.get('/', authMiddleware.verifyToken, paymentController.getPayments);
router.get('/my-payments', authMiddleware.verifyToken, authMiddleware.requireCustomer, paymentController.getMyPayments);
router.get('/:id', paymentController.getPayment);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, paymentController.updatePayment);

module.exports = router;