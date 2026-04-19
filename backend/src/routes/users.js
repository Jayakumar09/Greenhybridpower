const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.get('/profile', authMiddleware.verifyToken, authMiddleware.requireCustomer, userController.getProfile);
router.put('/profile', authMiddleware.verifyToken, authMiddleware.requireCustomer, userController.updateProfile);
router.get('/addresses', authMiddleware.verifyToken, authMiddleware.requireCustomer, userController.getAddresses);
router.post('/addresses', authMiddleware.verifyToken, authMiddleware.requireCustomer, userController.addAddress);
router.put('/addresses/:addressId', authMiddleware.verifyToken, authMiddleware.requireCustomer, userController.updateAddress);
router.delete('/addresses/:addressId', authMiddleware.verifyToken, authMiddleware.requireCustomer, userController.deleteAddress);
router.get('/notifications', authMiddleware.verifyToken, authMiddleware.requireCustomer, userController.getNotifications);
router.put('/notifications/:id/read', authMiddleware.verifyToken, authMiddleware.requireCustomer, userController.markNotificationRead);

module.exports = router;