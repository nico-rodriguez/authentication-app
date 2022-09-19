import React, { useContext } from 'react';

import githubLogo from './Github.svg';
import googleLogo from './Google.svg';

import './Form.css';
import { UserContext } from 'context/user';

import constants from 'constants/index';

export function Form({ buttonText, handleFormData }) {
  const { setAuthenticating } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    await handleFormData(email, password);
  };

  const handleOAuth = () => {
    setAuthenticating(true);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        className='form__email-input'
        type='email'
        placeholder='&#xe158; Email'
        name='email'
      />
      <input
        className='form__password-input'
        type='password'
        placeholder='&#xe88d; Password'
        name='password'
      />
      <button className='form__button' type='submit'>
        {buttonText}
      </button>
      <div className='form__alternatives'>
        <div className='alternatives__header'>
          or continue with these social profile
        </div>
        <div className='alternatives__items'>
          <a
            onClick={handleOAuth}
            href={`${constants.BACKEND_URL}/api/v1/auth/google`}
          >
            <img width='43' height='43' src={googleLogo} alt='Google logo' />
          </a>
          <a
            onClick={handleOAuth}
            href={`${constants.BACKEND_URL}/api/v1/auth/github`}
          >
            <img width='43' height='43' src={githubLogo} alt='Github logo' />
          </a>
        </div>
      </div>
    </form>
  );
}
