import { Link, useNavigate } from 'react-router-dom';

import { Form } from 'components/Form';

import { useLogo } from 'hooks/useLogo';
import { useUser } from 'hooks/useUser';
import { useUserApi } from 'hooks/useUserApi';

export default function Login() {
  const navigate = useNavigate();

  const logo = useLogo();

  const { setIsLoggedIn } = useUser();

  const userApi = useUserApi();

  const handleFormData = async (email, password) => {
    const successfulLogin = await userApi.login(email, password);
    if (successfulLogin) {
      setIsLoggedIn(true);
      navigate('/welcome');
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
