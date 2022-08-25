import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: '/api/v1/',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      toast.error(error.response.data);
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      toast.error('Could not reach server. Please try again.');
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error('Error' + error.message);
      console.error('Error', error.message);
    }

    console.error(error.config);

    return Promise.reject(error);
  }
);

export default axiosInstance;
