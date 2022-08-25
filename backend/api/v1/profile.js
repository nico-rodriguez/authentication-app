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
  // dest: 'uploads/',
  storage,
  limits: {
    // Max file size (1MB)
    fileSize: 1024 * 1024,
  },
}).single('photo');

router.get('/', isUserAuth, function (req, res) {
  const { user } = req;
  res.json(user);
});

router.post('/edit', isUserAuth, upload, async function (req, res) {
  const { name, bio, phone, email, password } = req.body;
  const { user, file } = req;

  const { isValid: isPhoneValid } = validatePhone(phone);
  if (!isPhoneValid) {
    res.statusCode = 400;
    return res.json('Invalid phone number');
  }

  if ((!email && password) || (email && !password)) {
    res.statusCode = 400;
    return res.json('Email and password must be set together');
  }

  password && (await user.setPassword(password));

  const photo = cloudinary.url(`${STORAGE_FOLDER_NAME}/${req.user._id}.png`, {
    width: 72,
    height: 72,
    crop: 'fill',
  });

  const updateFields = {
    photo,
    ...filterFalsyProps({ name, bio, phone, email }),
  };

  const updatedUser = await User.findByIdAndUpdate(user._id, updateFields, {
    new: true,
  });

  res.json(updatedUser);
});

module.exports = router;
