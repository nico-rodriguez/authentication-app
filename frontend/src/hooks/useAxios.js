import axios from 'axios';
import { toast } from 'react-toastify';
import constants from 'constants/index';
import { useUser } from './useUser';
import userStorage from 'storage/users';

export const useAxios = () => {
  const { setUser, setIsLoggedIn, setAuthenticating } = useUser();

  const axiosInstance = axios.create({
    baseURL: `${constants.BACKEND_URL}/api/v1/`,
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    ({ data }) => data,
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data);

        if (error.response.status === 401) {
          setUser(null);
          setIsLoggedIn(false);
          setAuthenticating(false);
          userStorage.clear();
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        toast.error('Could not reach server. Please try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error('Error' + error.message);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
