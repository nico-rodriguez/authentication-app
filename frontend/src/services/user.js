import axios from 'lib/axios';
import { toast } from 'react-toastify';

const signup = async (email, password) => {
  try {
    await axios.post('signup', { email, password });
    toast.success('Signup successful');
  } catch (error) {}
};

const login = async (email, password) => {
  try {
    await axios.post('login', { email, password });
    toast.success('Login successful');
  } catch (error) {}
};

const getProfile = async () => {
  const user = await axios.get('profile');
  return user;
};

const editProfile = async ({ photo, name, bio, phone, email, password }) => {
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
    });
    toast.success('Profile edited successfully');
    return newProfile;
  } catch (error) {}
};

const saveUserPhoto = (photoURL) => {
  sessionStorage.setItem('userPhoto', photoURL);
};

const getUserPhoto = () => sessionStorage.getItem('userPhoto');

const saveUserName = (name) => {
  sessionStorage.setItem('userName', name);
};

const getUserName = () => sessionStorage.getItem('userName');

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
