const cloudinary = require('cloudinary').v2;
const { MulterError } = require('multer');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const STORAGE_FOLDER_NAME = 'profile-pictures';
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: STORAGE_FOLDER_NAME,
    format: async (req, file) => 'png',
    public_id: (req, file) => req.user._id,
  },
});

const upload = multer({
  storage,
  limits: {
    // Max file size (1MB)
    fileSize: 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    const validMimeTypes = ['image/jpeg', 'image/png'];
    const isFileMimeTypeValid = validMimeTypes.includes(file.mimetype);
    if (isFileMimeTypeValid) {
      return cb(null, true);
    }

    console.log('Throwing error');
    cb(new MulterError('Invalid file type. Must be JPEG or PNG'));
  },
}).single('photo');

module.exports = upload;
