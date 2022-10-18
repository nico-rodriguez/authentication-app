import './Header.css';
import { Link } from 'react-router-dom';
import storage from 'utils/storage';
import { useLogo } from 'hooks/useLogo';
import constants from 'constants/index';
import { useUser } from 'hooks/useUser';

export default function Header() {
  const logo = useLogo();

  const { user } = useUser();

  const handleLogout = () => {
    storage.clear();
  };

  return (
    <header className='profile-header'>
      <img
        width='132'
        height='19'
        src={logo}
        alt='devchallenges logo'
        className='profile-header__logo'
      />
      <div tabIndex={0} className='profile-header__user-info'>
        <img
          src={user.photo}
          width={32}
          height={32}
          alt=''
          className='profile-header__user-image'
        />
        <p className='profile-header__user-name'>{user.name}</p>
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
              href={`${constants.BACKEND_URL}/api/v1/logout`}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
