const express = require('express');
const router = express.Router();
const installationController = require('../controllers/installationController');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware.verifyToken, authMiddleware.requireAdmin, installationController.createInstallation);
router.get('/', installationController.getInstallations);
router.get('/my-installations', authMiddleware.verifyToken, authMiddleware.requireCustomer, installationController.getMyInstallations);
router.get('/:id', installationController.getInstallation);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.requireAdmin, installationController.updateInstallation);
router.put('/:id/stage', authMiddleware.verifyToken, authMiddleware.requireAdmin, installationController.updateStage);

module.exports = router;