import Loader from 'components/Loader';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorHandler from './error';
import { ToastContainerProvider } from './toast';
import { UserProvider } from './user';

export const AppProvider = ({ children }) => (
  <ToastContainerProvider>
    <Suspense fallback={<Loader />}>
      <ErrorHandler>
        <UserProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </UserProvider>
      </ErrorHandler>
    </Suspense>
  </ToastContainerProvider>
);
