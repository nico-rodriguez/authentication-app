import { toast } from 'react-toastify';

const signup = async (axios, email, password) => {
  try {
    await toast.promise(axios.post('signup', { email, password }), {
      pending: 'Signing up...',
      success: 'Signed up successfully',
    });
    return true;
  } catch (error) {}
};

const login = async (axios, email, password) => {
  try {
    await toast.promise(axios.post('login', { email, password }), {
      pending: 'Logging in...',
      success: 'Logged in successfully',
    });
    return true;
  } catch (error) {}
};

const getProfile = async (axios) => {
  try {
    const user = await axios.get('profile');
    return user;
  } catch (error) {}
};

const editProfile = async (
  axios,
  { photo, name, bio, phone, email, password }
) => {
  const editData = new FormData();
  photo && editData.append('photo', photo, photo.name);
  editData.append('name', name);
  editData.append('bio', bio);
  editData.append('phone', phone);
  editData.append('email', email);
  editData.append('password', password);

  try {
    const newProfile = await toast.promise(
      axios.post('profile/edit', editData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      {
        pending: 'Updating profile...',
        success: 'Profile edited successfully',
        error: "Couldn't edit profile",
      }
    );
    return newProfile;
  } catch (error) {}
};

const userApi = {
  signup,
  login,
  getProfile,
  editProfile,
};

export default userApi;
