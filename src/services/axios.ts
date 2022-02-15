import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 180 * 1000,
  withCredentials: true,
  validateStatus(status): boolean {
    return status >= 200 && status < 500;
  },
});

export default axiosInstance;
