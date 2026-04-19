const express = require('express');
const router = express.Router();
const serviceRequestController = require('../controllers/serviceRequestController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.verifyToken, authMiddleware.requireCustomer, serviceRequestController.createServiceRequest);
router.get('/', authMiddleware.verifyToken, serviceRequestController.getServiceRequests);
router.get('/my-requests', authMiddleware.verifyToken, authMiddleware.requireCustomer, serviceRequestController.getMyServiceRequests);
router.get('/:id', serviceRequestController.getServiceRequest);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, serviceRequestController.updateServiceRequest);

module.exports = router;