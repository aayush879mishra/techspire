const multer = require('multer');
const { diskStorage } = require('multer');
const path = require('path');

const re = new RegExp("\\s+", "g");
const sanitizeFileName = (imageName) => {
  return imageName.replace(re, "-").replace(/[^a-zA-Z0-9_\-\.]/g, "");
};

const filename = (req, file, next) => {
  let lastDotIndex = file.originalname.lastIndexOf(".");
  let originalnames = file.originalname.substring(0, lastDotIndex);
  let ext = file.originalname.substring(lastDotIndex);
  next(null, `${sanitizeFileName(originalnames)}-${Date.now()}${ext}`);
};

const filter = (req, file, next) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/heic",
    "image/webp",
    "image/avif",
    "image/gif",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    next(null, true);
  } else {
    next(null, false);
    return next(
      new Error("Only .jpeg, .jpg, .png, .heic, .webp, .avif, .gif formats allowed!")
    );
  }
};

const getDestination = (folderName) => {
  return (req, file, next) => {
    next(null, path.join(__dirname, `../../uploads/${folderName}`));
  };
};

const galleryImageStorage = diskStorage({
  destination: getDestination("galleryImages"),
  filename,
});

const galleryImages = multer({
  storage: galleryImageStorage,
  fileFilter: filter,
}).array('images', 10); // Allow up to 10 images to be uploaded at once

module.exports = {
  galleryImages
};
