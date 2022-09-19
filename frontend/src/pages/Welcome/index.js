import userApi from 'api/users';
import { UserContext } from 'context/user';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import logo from './devchallenges.png';
import Spinner from 'components/Spinner';

const Welcome = () => {
  const [loadingProfile, setLoadingProfile] = useState(true);

  const { user, setUser, setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLoadingProfile(false);
      setIsLoggedIn(true);
      return navigate('/profile');
    }

    if (loadingProfile) {
      userApi
        .getProfile()
        .then(({ photo, name, bio, phone, email }) => {
          const user = Object.assign(
            {
              photo: '',
              name: '...',
              bio: '...',
              phone: '...',
              email: '...',
            },
            { photo, name, bio, phone, email }
          );
          setLoadingProfile(false);
          setIsLoggedIn(true);
          setUser(user);
          return navigate('/profile');
        })
        .catch(() => {
          setLoadingProfile(false);
          setIsLoggedIn(false);
          return navigate('/signup');
        });
    }
  }, [user, loadingProfile, navigate, setUser, setIsLoggedIn]);

  return (
    <main className='welcome'>
      <h2 className='welcome__title'>Welcome</h2>
      <img width='53' height='53' src={logo} alt='devChallenges logo' />
      <h3 className='welcome__subtitle'>Authentication app</h3>
      <Spinner />
    </main>
  );
};

export default Welcome;
