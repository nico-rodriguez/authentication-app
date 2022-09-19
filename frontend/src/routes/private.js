import { Navigate } from 'react-router-dom';

import ProfileWrapper from 'components/ProfileWrapper';
import { lazy } from 'react';
import Welcome from 'pages/Welcome';

const Profile = lazy(() => import('pages/Profile'));
const Edit = lazy(() => import('pages/Profile/Edit'));

const privateRoutes = [
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/profile',
    element: <ProfileWrapper />,
    children: [
      {
        path: '',
        element: <Profile />,
      },
      {
        path: 'edit',
        element: <Edit />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to='/welcome' />,
  },
];

export default privateRoutes;
