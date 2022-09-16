import { NewtonsCradle } from '@uiball/loaders';

import './Loader.css';

const Loader = () => {
  const color = matchMedia('(prefers-color-scheme: dark)').matches
    ? '#e0e0e0'
    : '#4f4f4f';

  return (
    <div className='loader-wrapper'>
      <NewtonsCradle size={40} speed={1.4} color={color} />
    </div>
  );
};

export default Loader;
