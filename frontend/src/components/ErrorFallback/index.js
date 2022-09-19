import './ErrorFallback.css';

const ErrorFallback = () => {
  return (
    <div className='error-fallback'>
      <h2>Ooops, something went wrong :(</h2>
      <a href={window.location.origin}>&#xe5d5;</a>
    </div>
  );
};

export default ErrorFallback;
