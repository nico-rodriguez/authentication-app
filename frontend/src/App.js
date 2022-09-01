import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ProfileWrapper from 'components/ProfileWrapper';
import Wrapper from 'components/Wrapper';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Signup from 'pages/Signup';
import Edit from 'pages/Profile/Edit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import userService from 'services/user';

function App() {
  const [userName, setUserName] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  const setUserData = (userName, userPhoto) => {
    setUserName(userName);
    setUserPhoto(userPhoto);
    userService.saveUserName(userName);
    userService.saveUserPhoto(userPhoto);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' />} />
        <Route path='/' element={<Wrapper />}>
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route
          path='/profile'
          element={<ProfileWrapper userName={userName} userPhoto={userPhoto} />}
        >
          <Route path='' element={<Profile setUserData={setUserData} />} />
          <Route path='edit' element={<Edit setUserData={setUserData} />} />
        </Route>
      </Routes>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
