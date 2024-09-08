const { default: mongoose } = require('mongoose');
const Service = require('../models/serviceModel');

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { name, description, category, price, duration, image } = req.body;

    const service = new Service({
      name,
      description,
      category,
      price,
      duration,
      image,
    });

    await service.save();
    res.status(201).json({msg: "New service created", service});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const { name, description, category, price, duration, image } = req.body;

    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    service.name = name || service.name;
    service.description = description || service.description;
    service.category = category || service.category;
    service.price = price || service.price;
    service.duration = duration || service.duration;
    service.image = image || service.image;

    await service.save();
    res.json({msg: "Service updated successfully", service});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



// Delete a service
exports.deleteService = async (req, res) => {
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }

    // Attempt to find and delete the service by ID
    const result = await Service.findByIdAndDelete(req.params.id);
    
    // Check if the service was found and deleted
    if (!result) {
      return res.status(404).json({ msg: 'Service not found' });
    }

    // Send a success response
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

