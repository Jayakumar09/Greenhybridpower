const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const authMiddleware = require('../middlewares/auth');

router.post('/', leadController.createLead);
router.get('/', leadController.getLeads);
router.get('/my-leads', authMiddleware.verifyToken, authMiddleware.requireCustomer, leadController.getMyLeads);
router.get('/:id', leadController.getLead);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, leadController.updateLead);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, leadController.deleteLead);

module.exports = router;