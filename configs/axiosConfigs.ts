import axios, { AxiosError } from 'axios';

export const api = axios.create({
  withCredentials: true,
  baseURL: 'https://yourdomain.com/api/v1'
});

// defining a custom error handler for all APIs
const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
