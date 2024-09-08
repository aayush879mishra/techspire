const Contact = require('../models/contactModel');

// Create a new contact submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = new Contact({ name, email, phone, message });

    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all contact submissions
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single contact by ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    await contact.remove();
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
