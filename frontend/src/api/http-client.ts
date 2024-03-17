import axios, { AxiosInstance } from 'axios';

const axiosInstance = axios.create({
  validateStatus: () => true,
});

export const getAxios = (): AxiosInstance => axiosInstance;
