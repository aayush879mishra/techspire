const express = require('express');
const router = express.Router();
const { createAdmin,loginAdmin, getAdminDetails, updateAdminDetails } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to recreate the admin
router.post('/createAdmin', createAdmin);

// Route to log in as admin
router.post('/login', loginAdmin);

// Route to get admin details (protected route)
router.get('/me', authMiddleware, getAdminDetails);

// Route to update admin details (protected route)
router.put('/me', authMiddleware, updateAdminDetails);

module.exports = router;
