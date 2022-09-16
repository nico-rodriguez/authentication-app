import Loader from 'components/Loader';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ToastProvider } from './toast';
import { UserProvider } from './user';

export const AppProvider = ({ children }) => (
  <Suspense fallback={<Loader />}>
    <ToastProvider>
      <UserProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </UserProvider>
    </ToastProvider>
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
  </Suspense>
);
