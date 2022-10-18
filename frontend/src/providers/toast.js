import { ToastContainer } from 'react-toastify';

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
