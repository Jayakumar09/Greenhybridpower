const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth');

router.get('/dashboard', authMiddleware.verifyToken, authMiddleware.requireAdmin, adminController.getDashboard);
router.get('/customers', authMiddleware.verifyToken, authMiddleware.requireAdmin, adminController.getCustomers);
router.get('/customers/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, adminController.getCustomer);
router.post('/customers', authMiddleware.verifyToken, authMiddleware.requireAdmin, adminController.createCustomer);
router.get('/activity-logs', authMiddleware.verifyToken, authMiddleware.requireAdmin, adminController.getActivityLogs);

module.exports = router;