import './ErrorFallback.css';

const ErrorFallback = () => {
  return (
    <div className='error-fallback'>
      <h2>Ooops, something went wrong :(</h2>
      <a href={window.location.origin}>
        <span class='material-icons'>refresh</span>
      </a>
    </div>
  );
};

export default ErrorFallback;
