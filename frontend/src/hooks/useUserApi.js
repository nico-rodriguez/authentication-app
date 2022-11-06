import userApi from 'api/users';
import { useAxios } from './useAxios';

export const useUserApi = () => {
  const axios = useAxios();

  const { signup, login, getProfile, editProfile } = userApi;

  return {
    signup: (email, password) => signup(axios, email, password),
    login: (email, password) => login(axios, email, password),
    getProfile: () => getProfile(axios),
    editProfile: (editFields) => editProfile(axios, editFields),
  };
};
