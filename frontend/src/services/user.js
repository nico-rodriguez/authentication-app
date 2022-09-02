import axios from 'lib/axios';
import { toast } from 'react-toastify';

const signup = async (email, password) => {
  try {
    await axios.post('signup', { email, password });
    toast.success('Signup successful');
    return true;
  } catch (error) {}
};

const login = async (email, password) => {
  try {
    await axios.post('login', { email, password });
    toast.success('Login successful');
    return true;
  } catch (error) {}
};

const getProfile = async () => {
  try {
    const user = await axios.get('profile');
    return user;
  } catch (error) {}
};

const editProfile = async (
  { photo, name, bio, phone, email, password },
  toastId
) => {
  const editData = new FormData();
  photo && editData.append('photo', photo, photo.name);
  editData.append('name', name);
  editData.append('bio', bio);
  editData.append('phone', phone);
  editData.append('email', email);
  editData.append('password', password);

  try {
    const newProfile = await axios.post('profile/edit', editData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: ({ loaded, total }) => {
        const progress = loaded / total;

        if (toastId.current === null) {
          toastId.current = toast('Upload in progress', { progress });
        } else {
          toast.update(toastId.current, { progress });
        }
      },
    });
    toast.done(toastId.current);
    toastId.current = null;
    toast.success('Profile edited successfully');
    return newProfile;
  } catch (error) {}
};

const saveUserPhoto = (photoURL) => {
  sessionStorage.setItem('user-photo', photoURL);
};

const getUserPhoto = () => sessionStorage.getItem('user-photo');

const saveUserName = (name) => {
  sessionStorage.setItem('user-name', name);
};

const getUserName = () => sessionStorage.getItem('user-name');

const logout = async () => {
  await axios.get('logout');
};

const userService = {
  signup,
  login,
  getProfile,
  editProfile,
  saveUserPhoto,
  getUserPhoto,
  saveUserName,
  getUserName,
  logout,
};

export default userService;
