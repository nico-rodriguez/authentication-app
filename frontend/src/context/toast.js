import { createContext, useRef } from 'react';
import { toast } from 'react-toastify';

export const ToastContext = createContext(null);

export const ToastContextProvider = ({ children }) => {
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
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
