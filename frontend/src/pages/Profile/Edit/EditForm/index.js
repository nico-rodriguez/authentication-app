import { useEffect, useRef, useState } from 'react';
import intlTelInput from 'intl-tel-input';
import userService from 'services/user';
import 'intl-tel-input/build/css/intlTelInput.css';
import './EditForm.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditForm = ({ setUserData }) => {
  const [userPhoto, setUserPhoto] = useState(() => userService.getUserPhoto());
  const [showPassword, setShowPassword] = useState(false);

  const phoneInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const input = document.querySelector('#phone');
    phoneInputRef.current = intlTelInput(input, {
      autoPlaceholder: 'aggressive',
      preferredCountries: ['US', 'UY'],
      utilsScript:
        'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.18/js/utils.min.js',
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
      phone,
      ...getInputValues({
        name,
        bio,
        email,
        password,
      }),
    };

    const isPhoneInvalid =
      phoneInputRef.current.value && !phoneInputRef.current.isValidNumber();
    if (isPhoneInvalid) {
      toast.error('Invalid phone number');
      return;
    }

    const user = await userService.editProfile(editFields);
    if (user) {
      setUserData(user.name, user.photo);
      const form = event.target;
      form.reset();
      navigate('/profile');
    }
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
        <input type='text' name='phone' id='phone' />
      </div>
      <div className='profile-edit-form__item'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
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
