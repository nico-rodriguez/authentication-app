import Loader from 'components/Loader';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ErrorHandler from './error';
import { ToastProvider } from './toast';
import { UserProvider } from './user';

export const AppProvider = ({ children }) => (
  <Suspense fallback={<Loader />}>
    <ErrorHandler>
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
    </ErrorHandler>
  </Suspense>
);
