import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { hash } from '@/helper';
import { getCookie, removeCookie } from '@/app/[locale]/actions';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const sign = hash({
      method: config.method?.toUpperCase() as string,
      path: config.url as string,
      body: config.data,
      secret: await getCookie({ name: 'secret' }).then(
        (res) => res?.value as string
      ),
    });
    const key = await getCookie({ name: 'key' }).then(
      (res) => res?.value as string
    );
    config.headers['Key'] = key;
    config.headers['Sign'] = sign;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      removeCookie({ name: 'key' });
      removeCookie({ name: 'secret' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
