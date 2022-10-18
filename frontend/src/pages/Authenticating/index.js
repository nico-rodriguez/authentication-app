import userApi from 'api/users';
import { useUser } from 'hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Authenticating.css';

const Authenticating = () => {
  const { setAuthenticating, setIsLoggedIn, setUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
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
        setUser(user);
        setTimeout(() => {
          setAuthenticating(false);
          setIsLoggedIn(true);
          navigate('/welcome');
        }, 2000);
      })
      .catch(() => {
        setAuthenticating(false);
        setIsLoggedIn(false);
        navigate('/signup');
      });
  }, [navigate, setUser, setIsLoggedIn, setAuthenticating]);

  return (
    <main className='authenticating'>
      <h2 className='authenticating__title'>Authenticating</h2>
    </main>
  );
};

export default Authenticating;
