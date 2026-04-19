const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.verifyToken, authMiddleware.requireAdmin, quotationController.createQuotation);
router.get('/', quotationController.getQuotations);
router.get('/my-quotations', authMiddleware.verifyToken, authMiddleware.requireCustomer, quotationController.getMyQuotations);
router.get('/:id', quotationController.getQuotation);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, quotationController.updateQuotation);

module.exports = router;