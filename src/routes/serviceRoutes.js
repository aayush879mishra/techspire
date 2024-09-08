const express = require('express');
const router = express.Router();
const { createService, getAllServices, getServiceById, updateService, deleteService } = require('../controllers/serviceController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to create a new service (POST /services)
router.post('/addNewServices',  createService);

// Route to get all services (GET /services)
router.get('/seeServices', getAllServices);

// Route to get a single service by ID (GET /services/:id)
router.get('/services/:id', getServiceById);

// Route to update a service (PUT /services/:id)
router.put('/services/:id',  updateService);

// Route to delete a service (DELETE /services/:id)
router.delete('/services/:id',  deleteService);

module.exports = router;
