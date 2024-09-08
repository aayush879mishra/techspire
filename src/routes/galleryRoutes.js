const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { galleryImages } = require('../middlewares/uploadMiddleware');

// POST route to add multiple images to the gallery
router.post('/gallery/addImages', galleryImages, galleryController.addGalleryItems);

// GET route to retrieve all gallery items
router.get('/gallery', galleryController.getGalleryItems);

// DELETE route to remove a gallery item by ID
router.delete('/gallery/:id', galleryController.deleteGalleryItem);

module.exports = router;
