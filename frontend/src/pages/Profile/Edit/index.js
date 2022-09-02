import { Link } from 'react-router-dom';
import './Edit.css';
import EditForm from './EditForm';

const Edit = () => {
  return (
    <div className='profile-edit'>
      <Link to='/profile' className='profile-edit__back-link'>
        &#xe5e0; Back
      </Link>
      <main className='profile-edit__main'>
        <h1 className='profile-edit__title'>Change Info</h1>
        <p className='profile-edit__description'>
          Changes will be reflected to every services
        </p>
        <EditForm />
      </main>
    </div>
  );
};

export default Edit;
