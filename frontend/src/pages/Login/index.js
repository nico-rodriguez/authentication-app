import { Link, useNavigate } from 'react-router-dom';

import { Form } from 'components/Form';
import userApi from 'api/users';

import { useContext } from 'react';
import { UserContext } from 'context/user';
import { useLogo } from 'hooks';

export default function Login() {
  const navigate = useNavigate();

  const logo = useLogo();

  const { setIsLoggedIn } = useContext(UserContext);

  const handleFormData = async (email, password) => {
    const successfulLogin = await userApi.login(email, password);
    if (successfulLogin) {
      navigate('/profile');
      setIsLoggedIn(true);
    }
  };

  return (
    <main className='main'>
      <h1 className='main__header-1'>
        <img width='132' height='19' src={logo} alt='Authentication app logo' />
      </h1>
      <h2 className='main__header-2'>Login</h2>
      <Form buttonText='Login' handleFormData={handleFormData} />
      <div className='main__footer'>
        Don't have an account yet?{' '}
        <Link className='main__link' to='/signup'>
          Register
        </Link>
      </div>
    </main>
  );
}
