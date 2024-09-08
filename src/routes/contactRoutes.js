const express = require('express');
const router = express.Router();
const { createContact, getAllContacts, getContactById, deleteContact } = require('../controllers/contactController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to create a new contact submission (POST /contacts)
router.post('/contacts', createContact);

// Route to get all contact submissions (GET /contacts)
router.get('/contacts',  getAllContacts);

// Route to get a single contact by ID (GET /contacts/:id)
router.get('/contacts/:id', authMiddleware, getContactById);

// Route to delete a contact submission (DELETE /contacts/:id)
router.delete('/contacts/:id', authMiddleware, deleteContact);

module.exports = router;
