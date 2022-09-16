import { ToastContext } from 'context/toast';
import { useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const ToastProvider = ({ children }) => {
  const toastId = useRef(null);

  const createToast = (message, options) => {
    if (toastId.current === null) {
      toastId.current = toast(message, { ...options });
    }
  };

  const updateToast = (options) => {
    if (toastId !== null) {
      toast.update(toastId.current, options);
    }
  };

  const closeToast = () => {
    if (toastId.current !== null) {
      toast.done(toastId.current);
    }
  };

  const value = {
    toastId,
    createToast,
    updateToast,
    closeToast,
  };

  return (
    <>
      <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
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
};
