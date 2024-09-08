const Gallery = require('../models/galleryModel');
const MAX_TOTAL_IMAGES = 20; // Set the maximum number of images allowed in the gallery

exports.addGalleryItems = async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
       
        return res.status(400).json({ msg: 'No images uploaded' });
      }

      // Check the current number of images in the gallery
    const currentImageCount = await Gallery.countDocuments();
    
    // Calculate the new total if these files are uploaded
    const newTotal = currentImageCount + req.files.length;

    if (newTotal > MAX_TOTAL_IMAGES) {
      return res.status(400).json({
        msg: `Upload failed. This upload would exceed the maximum of ${MAX_TOTAL_IMAGES} images allowed.`
      });
    }
      const galleryItems = req.files.map((file) => {
        // console.log(req.file);
        return {
          
          title: req.body.title, // Ensure title is coming from the request body
          images: `/uploads/galleryImages/${file.filename}`,
          // Add any other fields you want to save for each image
        };
      });
  
      await Gallery.insertMany(galleryItems);
  
      res.status(201).json({ msg: 'Gallery images uploaded successfully' });
    } catch (err) {
      res.status(500).json({ msg: 'Failed to upload gallery images', error: err.message });
    }
  };

exports.getGalleryItems = async (req, res) => {
  try {
    // Retrieve all gallery items
    const galleryItems = await Gallery.find();
    res.status(200).json(galleryItems);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to retrieve gallery items', error: err.message });
  }
};



exports.deleteGalleryItem = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the gallery item by ID
      const galleryItem = await Gallery.findByIdAndDelete(id);
      if (!galleryItem) {
        return res.status(404).json({ msg: 'Gallery item not found' });
      }
  
      // Optionally, delete the image file from the server as well
      // Implement file deletion logic here if needed
  
      res.status(200).json({ msg: 'Gallery item deleted successfully' });
    } catch (err) {
      res.status(500).json({ msg: 'Failed to delete gallery item', error: err.message });
    }
  };