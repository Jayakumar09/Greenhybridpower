const express = require('express');
const router = express.Router();
const monitoringController = require('../controllers/monitoringController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.verifyToken, authMiddleware.requireAdmin, monitoringController.addMonitoringData);
router.get('/', monitoringController.getMonitoringData);
router.get('/my-monitoring', authMiddleware.verifyToken, authMiddleware.requireCustomer, monitoringController.getMyMonitoringData);

module.exports = router;