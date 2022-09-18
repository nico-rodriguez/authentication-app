const { Router } = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { phone: validatePhone } = require('phone');
const User = require('../../models/User.js');
const isUserAuth = require('../../middleware/auth.js');
const { filterFalsyProps } = require('../../utils/objects.js');

const router = Router();

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

    cb(new Error('Invalid file type. Must be JPEG or PNG'));
  },
}).single('photo');

router.get('/', isUserAuth, function (req, res) {
  const { user } = req;

  return res.json(user);
});

router.post('/edit', isUserAuth, upload, async function (req, res) {
  const { name, bio, phone, email, password } = req.body;
  const { user, file } = req;

  const { isValid: isPhoneValid } = validatePhone(phone);
  if (phone && !isPhoneValid) {
    res.statusCode = 400;
    return res.json('Invalid phone number');
  }

  if (password) {
    const userUpdated = await user.setPassword(password);
    await userUpdated.save();
  }

  let updateFields = {};
  if (file) {
    const photo = cloudinary.url(file.path, {
      width: 72,
      height: 72,
      crop: 'fill',
    });

    updateFields.photo = photo;
  }

  updateFields = {
    ...updateFields,
    ...filterFalsyProps({ name, bio, phone, email }),
  };

  const updatedUser = await User.findByIdAndUpdate(user._id, updateFields, {
    new: true,
  });

  return res.json(updatedUser);
});

module.exports = router;
