import { ToastContext } from 'context/toast';
import { useRef } from 'react';
import { ToastContainer } from 'react-toastify';

export const ToastProvider = ({ children }) => {
  const toastId = useRef(null);

  const value = {
    toastId,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const ToastContainerProvider = ({ children }) => (
  <>
    {children}
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
  </>
);
