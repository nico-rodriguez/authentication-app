import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import ProfileWrapper from 'components/ProfileWrapper';
import Wrapper from 'components/Wrapper';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Signup from 'pages/Signup';
import Edit from 'pages/Profile/Edit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' />} />
        <Route path='/' element={<Wrapper />}>
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='/profile' element={<ProfileWrapper />}>
          <Route path='' element={<Profile />} />
          <Route path='edit' element={<Edit />} />
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
