import Loader from 'components/Loader';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorHandler from './error';
import { ToastContainerProvider, ToastProvider } from './toast';
import { UserProvider } from './user';

export const AppProvider = ({ children }) => (
  <ToastContainerProvider>
    <Suspense fallback={<Loader />}>
      <ErrorHandler>
        <ToastProvider>
          <UserProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </UserProvider>
        </ToastProvider>
      </ErrorHandler>
    </Suspense>
  </ToastContainerProvider>
);
