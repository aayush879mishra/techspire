const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/adminMiddleware'); // Middleware to authenticate JWT

// Route to register a new admin
router.post('/register', adminController.registerAdmin);

// Route to login an admin and get a JWT token
router.post('/login', adminController.loginAdmin);

// Route to get admin details (protected)
router.get('/me', authMiddleware, adminController.getAdminDetails);

// Route to update admin details (protected)
router.put('/update', authMiddleware, adminController.updateAdminDetails);

module.exports = router;
