import { Link, useNavigate } from 'react-router-dom';

import { Form } from 'components/Form';
import userService from 'services/user';

import logoLightTheme from 'assets/images/devchallenges.svg';
import logoDarkTheme from 'assets/images/devchallenges-light.svg';

export default function Login() {
  const navigate = useNavigate();
  const logo = matchMedia('(prefers-color-scheme: dark)').matches
    ? logoDarkTheme
    : logoLightTheme;

  const handleFormData = async (email, password) => {
    const successfulLogin = await userService.login(email, password);
    if (successfulLogin) {
      navigate('/profile');
    }
  };

  return (
    <main className='main'>
      <h1 className='main__header-1'>
        <img src={logo} alt='Authentication app logo' />
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
