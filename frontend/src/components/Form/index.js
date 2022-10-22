import githubLogo from './Github.svg';
import googleLogo from './Google.svg';

import './Form.css';

import constants from 'constants/index';
import { useUser } from 'hooks/useUser';
import { useState } from 'react';

export function Form({ buttonText, handleFormData }) {
  const { setAuthenticating } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    await handleFormData(email, password);
    setIsSubmitting(false);
  };

  const handleOAuth = () => {
    if (!isSubmitting) {
      setAuthenticating(true);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        disabled={isSubmitting}
        className='form__email-input'
        type='email'
        placeholder='&#xe158; Email'
        name='email'
      />
      <input
        disabled={isSubmitting}
        className='form__password-input'
        type='password'
        placeholder='&#xe88d; Password'
        name='password'
      />
      <button className='form__button' type='submit' disabled={isSubmitting}>
        {buttonText}
      </button>
      <div className='form__alternatives'>
        <div className='alternatives__header'>
          or continue with these social profile
        </div>
        <div className='alternatives__items'>
          <a
            title='Google'
            onClick={handleOAuth}
            href={
              isSubmitting ? '#' : `${constants.BACKEND_URL}/api/v1/auth/google`
            }
          >
            <img width='43' height='43' src={googleLogo} alt='Google logo' />
          </a>
          <a
            title='GitHub'
            onClick={handleOAuth}
            href={
              isSubmitting ? '#' : `${constants.BACKEND_URL}/api/v1/auth/github`
            }
          >
            <img width='43' height='43' src={githubLogo} alt='Github logo' />
          </a>
        </div>
      </div>
    </form>
  );
}
