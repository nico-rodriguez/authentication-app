const { phone: validatePhone } = require('phone');
const cloudinary = require('cloudinary').v2;
const UserDataError = require('../errors/user');
const User = require('../models/User');
const { filterFalsyProps } = require('../utils/objects');

async function register(email, password) {
  await User.register(new User({ email }), password);
}

async function editProfile(user, { name, bio, phone, email, password, file }) {
  const { isValid: isPhoneValid } = validatePhone(phone);
  if (phone && !isPhoneValid) {
    throw new UserDataError('Invalid phone number');
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

  return updatedUser;
}

module.exports = { register, editProfile };
