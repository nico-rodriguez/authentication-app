import { useEffect, useRef, useState } from 'react';
import intlTelInput from 'intl-tel-input';
import userService from 'services/user';
import 'intl-tel-input/build/css/intlTelInput.css';
import './EditForm.css';
import { toast } from 'react-toastify';

const EditForm = () => {
  const [userPhoto, setUserPhoto] = useState(() => userService.getUserPhoto());
  const [showPassword, setShowPassword] = useState(false);

  const phoneInputRef = useRef(null);

  useEffect(() => {
    const input = document.querySelector('#phone');
    phoneInputRef.current = intlTelInput(input, {
      preferredCountries: ['US', 'UY'],
    });
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const getInputValues = (objInputs) =>
    Object.entries(objInputs).reduce(
      (objValues, [key, input]) =>
        Object.assign(objValues, { [key]: input.value }),
      {}
    );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, bio, email, password } = event.target;
    const phone = phoneInputRef.current.getNumber();
    const [photo] = event.target.photo.files;

    URL.revokeObjectURL(userPhoto);

    const editFields = {
      photo,
      ...getInputValues({
        name,
        bio,
        phone,
        email,
        password,
      }),
    };

    const isPhoneInvalid = !phoneInputRef.current.isValidNumber();
    if (isPhoneInvalid) {
      toast.error('Invalid phone number');
      return;
    }

    if ((!email && password) || (email && !password)) {
      toast.error('Email and password must be set together');
      return;
    }

    const user = await userService.editProfile(editFields);
    userService.saveUserPhoto(user.photo);
    userService.saveUserName(user.name);
  };

  return (
    <form className='profile-edit-form' onSubmit={handleSubmit}>
      <div className='profile-edit-form__item'>
        <input
          type='file'
          className='profile-edit-form__photo-input'
          id='photo-input'
          name='photo'
          onChange={(event) => {
            // Create a URL for temporary displaying the photo
            setUserPhoto(URL.createObjectURL(event.target.files[0]));
          }}
        />
        <label htmlFor='photo-input' id='photo-input-label'>
          <img src={userPhoto} alt='' width={72} height={72} />
        </label>
        <p id='photo-input-text'>CHANGE PHOTO</p>
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          placeholder='Enter your name...'
          name='name'
          id='name'
        />
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='bio'>Bio</label>
        <textarea
          type='text'
          placeholder='Enter your bio...'
          rows={3}
          name='bio'
          id='bio'
        />
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='phone'>Phone</label>
        <input
          type='text'
          placeholder='Enter your phone...'
          name='phone'
          id='phone'
        />
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          placeholder='Enter your email...'
          name='email'
          id='email'
        />
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='password'>Password</label>
        <input
          type={showPassword ? 'type' : 'password'}
          placeholder='Enter your password...'
          name='password'
          id='password'
        />
        <button
          type='button'
          className='profile-edit-form__show-password-button'
          onClick={toggleShowPassword}
        >
          {showPassword ? (
            <span className='material-icons'>visibility</span>
          ) : (
            <span className='material-icons'>password</span>
          )}
        </button>
      </div>
      <button className='profile-edit-form__submit-button' type='submit'>
        Save
      </button>
    </form>
  );
};

export default EditForm;
