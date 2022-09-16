import { Navigate } from 'react-router-dom';

import ProfileWrapper from 'components/ProfileWrapper';
import Profile from 'pages/Profile';
import Edit from 'pages/Profile/Edit';

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
