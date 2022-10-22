const cloudinary = require('cloudinary').v2;
const { MulterError } = require('multer');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const STORAGE_FOLDER_NAME = 'profile-pictures';
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: STORAGE_FOLDER_NAME,
    format: async () => 'png',
    public_id: (req) => req.user._id,
  },
});

const upload = multer({
  storage,
  limits: {
    // Max file size (1MB)
    fileSize: 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const validMimeTypes = ['image/jpeg', 'image/png'];
    const isFileMimeTypeValid = validMimeTypes.includes(file.mimetype);
    if (isFileMimeTypeValid) {
      return cb(null, true);
    }

    return cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
  },
}).single('photo');

module.exports = upload;
