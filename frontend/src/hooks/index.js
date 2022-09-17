import logoLightTheme from 'assets/images/devchallenges.svg';
import logoDarkTheme from 'assets/images/devchallenges-light.svg';
import { useState } from 'react';

export const useLogo = () => {
  const logo = matchMedia('(prefers-color-scheme: dark)').matches
    ? logoDarkTheme
    : logoLightTheme;

  return logo;
};

export const useToggle = (initial) => {
  const [value, setValue] = useState(Boolean(initial));

  const toggle = () => {
    setValue((value) => !value);
  };

  return [value, toggle];
};
