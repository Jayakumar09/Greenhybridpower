const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/admin-login', authController.adminLogin);
router.get('/me', authMiddleware.verifyToken, authController.getMe);
router.post('/reset-password', authMiddleware.verifyToken, authController.resetPassword);

module.exports = router;