import { Ring } from '@uiball/loaders';

const Spinner = () => {
  const color = matchMedia('(prefers-color-scheme: dark)').matches
    ? '#e0e0e0'
    : '#4f4f4f';

  return <Ring size={40} lineWeight={5} speed={2} color={color} />;
};

export default Spinner;
