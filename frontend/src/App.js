import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContextProvider } from 'context/toast';
import { AppRoutes } from 'routes';

function App() {
  return (
    <ToastContextProvider>
      <BrowserRouter>
        <AppRoutes />
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
    </ToastContextProvider>
  );
}

export default App;
