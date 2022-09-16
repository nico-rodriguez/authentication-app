import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from 'context/user';
import storage from 'utils/storage';
import { useLogo } from 'hooks';

export default function Header() {
  const logo = useLogo();

  const { userName, userPhoto, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
    storage.clear();
    setIsLoggedIn(false);
  };

  return (
    <header className='profile-header'>
      <img
        src={logo}
        alt='devchallenges logo'
        className='profile-header__logo'
      />
      <div tabIndex={0} className='profile-header__user-info'>
        <img
          src={userPhoto}
          width={32}
          height={32}
          alt=''
          className='profile-header__user-image'
        />
        <p className='profile-header__user-name'>{userName}</p>
        <ul className='profile-header__dropdown'>
          <li>
            <Link to='/profile'>My Profile</Link>
          </li>
          <li>
            <Link to='#'>Group Chat</Link>
          </li>
          <li></li>
          <li>
            <a
              onClick={handleLogout}
              href='http://localhost:5000/api/v1/logout'
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
