const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const authMiddleware = require('../middlewares/auth');

router.get('/', planController.getPlans);
router.get('/:id', planController.getPlan);
router.post('/', authMiddleware.verifyToken, authMiddleware.requireAdmin, planController.createPlan);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, planController.updatePlan);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, planController.deletePlan);

module.exports = router;