const { Router } = require('express');
const isUserAuth = require('../../middleware/auth');
const { editProfile } = require('../../service/user');
const upload = require('../../middleware/imageUploader');

const router = Router();

router.get('/', isUserAuth, (req, res) => {
  const { user } = req;

  return res.json(user);
});

router.post('/edit', isUserAuth, upload, async (req, res) => {
  const { name, bio, phone, email, password } = req.body;
  const { user, file } = req;

  const updatedUser = await editProfile(user, {
    name,
    bio,
    phone,
    email,
    password,
    file,
  });
  return res.json(updatedUser);
});

module.exports = router;
