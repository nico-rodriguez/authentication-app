const { default: Wrapper } = require('components/Wrapper');
const { default: Login } = require('pages/Login');
const { default: Signup } = require('pages/Signup');
const { Navigate } = require('react-router-dom');

const publicRoutes = [
  {
    path: '/',
    element: <Navigate to='/signup' />,
  },
  {
    path: '/',
    element: <Wrapper />,
    children: [
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/signup' />,
  },
];

export default publicRoutes;
