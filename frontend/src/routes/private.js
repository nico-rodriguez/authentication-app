import { Navigate } from 'react-router-dom';

const { default: ProfileWrapper } = require('components/ProfileWrapper');
const { default: Profile } = require('pages/Profile');
const { default: Edit } = require('pages/Profile/Edit');

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
