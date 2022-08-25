import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Form } from 'components/Form';

import logoLightTheme from 'assets/images/devchallenges.svg';
import logoDarkTheme from 'assets/images/devchallenges-light.svg';
import userService from 'services/user';

export default function Signup() {
  const navigate = useNavigate();
  const logo = matchMedia('(prefers-color-scheme: dark)').matches
    ? logoDarkTheme
    : logoLightTheme;

  const handleFormData = async (email, password) => {
    const successfulSignup = await userService.signup(email, password);
    if (successfulSignup) {
      navigate('/profile');
    }
  };

  return (
    <main className='main'>
      <h1 className='main__header-1'>
        <img src={logo} alt='Authentication app logo' />
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
