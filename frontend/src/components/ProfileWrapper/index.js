import { Outlet } from 'react-router-dom';

import { Footer } from 'components/Footer';
import Header from './Header';

import './ProfileWrapper.css';

export default function ProfileWrapper() {
  return (
    <div className='profile-page'>
      <Header />
      <div className='profile-wrapper'>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
