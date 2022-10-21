const { Router } = require('express');
const isUserAuth = require('../../middleware/auth');
const { editProfile } = require('../../service/user');
const upload = require('../../middleware/imageUploader');

const router = Router();

router.get('/', isUserAuth, function (req, res) {
  const { user } = req;

  return res.json(user);
});

router.post('/edit', isUserAuth, upload, async (req, res, next) => {
  const { name, bio, phone, email, password } = req.body;
  const { user, file } = req;

  try {
    const updatedUser = await editProfile(user, {
      name,
      bio,
      phone,
      email,
      password,
      file,
    });
    return res.json(updatedUser);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
