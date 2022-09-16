import { Navigate } from 'react-router-dom';

import ProfileWrapper from 'components/ProfileWrapper';
import { lazy } from 'react';

const Profile = lazy(() => import('pages/Profile'));
const Edit = lazy(() => import('pages/Profile/Edit'));

const privateRoutes = [
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
    element: <Navigate to='/profile' />,
  },
];

export default privateRoutes;
