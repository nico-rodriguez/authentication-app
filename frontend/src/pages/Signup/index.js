import { Link, useNavigate } from 'react-router-dom';

import { Form } from 'components/Form';

import userApi from 'api/users';
import { useLogo } from 'hooks/useLogo';
import { useUser } from 'hooks/useUser';

export default function Signup() {
  const navigate = useNavigate();
  const logo = useLogo();

  const { setIsLoggedIn } = useUser();

  const handleFormData = async (email, password) => {
    const successfulSignup = await userApi.signup(email, password);

    if (successfulSignup) {
      setIsLoggedIn(true);
      navigate('/welcome');
    }
  };

  return (
    <main className='main'>
      <h1 className='main__header-1'>
        <img width='132' height='19' src={logo} alt='Authentication app logo' />
      </h1>
      <h2 className='main__header-2'>
        Join thousands of learners from around the world{' '}
      </h2>
      <p className='main__content'>
        Master web development by making real-life projects. There are multiple
        paths for you to choose
      </p>
      <Form buttonText='Start coding now' handleFormData={handleFormData} />
      <div className='main__footer'>
        Already a member?{' '}
        <Link className='main__link' to='/login'>
          Login
        </Link>
      </div>
    </main>
  );
}
