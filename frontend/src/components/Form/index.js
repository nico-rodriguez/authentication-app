import React from 'react';

import githubLogo from './Github.svg';
import googleLogo from './Google.svg';

import './Form.css';

export function Form({ buttonText, handleFormData }) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    await handleFormData(email, password);
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
          <a href='http://localhost:5000/api/v1/auth/google'>
            <img src={googleLogo} alt='Google logo' />
          </a>
          <a href='http://localhost:5000/api/v1/auth/github'>
            <img src={githubLogo} alt='Github logo' />
          </a>
        </div>
      </div>
    </form>
  );
}
