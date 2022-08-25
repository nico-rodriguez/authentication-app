import React from 'react';

import './Footer.css';

export function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__item'>
        created by{' '}
        <a className='footer__link' href='#'>
          nico-rodriguez
        </a>
      </div>
      <div className='footer__item'>
        <a className='footer__link' href='#'>
          devChallenges.io
        </a>
      </div>
    </footer>
  );
}
