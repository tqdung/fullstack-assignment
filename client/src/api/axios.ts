import axios from 'axios';
import { LodashUtils } from '@utils/lodash';

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/',
});

AxiosInstance.interceptors.response.use(
  (response) => LodashUtils.get(response, 'data', {}),
  (error) => Promise.reject(LodashUtils.get(error, 'response.data', {})),
);

export { AxiosInstance };
