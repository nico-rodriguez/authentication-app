import { useState } from 'react';

export const useToggle = (initial) => {
  const [value, setValue] = useState(Boolean(initial));

  const toggle = () => {
    setValue((value) => !value);
  };

  return [value, toggle];
};
