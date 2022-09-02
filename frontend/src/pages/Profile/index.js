import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from 'services/user';

import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState({
    photo: '',
    name: '...',
    bio: '...',
    phone: '...',
    email: '...',
  });

  useEffect(() => {
    userService.getProfile().then(({ photo, name, bio, phone, email }) => {
      setUser((user) => ({
        photo: photo || user.photo,
        name: name || user.name,
        bio: bio || user.bio,
        phone: phone || user.phone,
        email: email || user.email,
      }));
    });
  }, []);

  return (
    <div className='profile'>
      <div className='profile__header'>
        <h1>Personal info</h1>
        <h2>Basic info, like your name and photo</h2>
      </div>
      <main className='profile__main'>
        <div className='main__header'>
          <div>
            <h2 className='profile__title'>Profile</h2>
            <p className='profile__description'>
              Some info may be visible to other people
            </p>
          </div>
          <Link className='profile__edit' to='/profile/edit'>
            Edit
          </Link>
        </div>
        <section className='profile__content'>
          <div className='profile__item-container'>
            <div className='profile__item-label'>Photo</div>
            <div className='profile__item-content'>
              <img src={user.photo} alt={user.name || ''} />
            </div>
          </div>
          <div className='profile__item-container'>
            <div className='profile__item-label'>Name</div>
            <div className='profile__item-content'>{user.name}</div>
          </div>
          <div className='profile__item-container'>
            <div className='profile__item-label'>Bio</div>
            <div className='profile__item-content'>{user.bio}</div>
          </div>
          <div className='profile__item-container'>
            <div className='profile__item-label'>Phone</div>
            <div className='profile__item-content'>{user.phone}</div>
          </div>
          <div className='profile__item-container'>
            <div className='profile__item-label'>Email</div>
            <div className='profile__item-content'>{user.email}</div>
          </div>
          <div className='profile__item-container'>
            <div className='profile__item-label'>Password</div>
            <div className='profile__item-content'>************</div>
          </div>
        </section>
      </main>
    </div>
  );
}
