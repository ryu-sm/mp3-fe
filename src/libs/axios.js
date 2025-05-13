import axios from 'axios';

import { publicPaths } from 'src/routes/paths';
import { useAuth } from 'src/store';
import { APIS } from 'src/apis';

const httpService = axios.create({ baseURL: import.meta.env.VITE_API_SERVER_URL });

httpService.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken') || null;
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      const originalRequest = error.config;
      const refreshToken = localStorage.getItem('refreshToken');
      if (error?.response?.data?.type !== 'refresh' && refreshToken && !originalRequest._retry) {
        originalRequest._retry = true;
        const res = await APIS.refreshToken();
        localStorage.setItem('accessToken', res?.data?.access_token);
        localStorage.setItem('refreshToken', res?.data?.refresh_token);
        if (res?.data?.access_token) {
          originalRequest.headers['Authorization'] = res?.data?.access_token;
          return httpService(originalRequest);
        }
      }
      axios.isCancel(error);

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      const isSuperAdmin = useAuth.getState().isSuperAdmin;
      if (isSuperAdmin) {
        window.location.replace(publicPaths.superLogin);
        return;
      } else {
        window.location.replace(publicPaths.tenantLogin);
        return;
      }
    }

    if (error?.response?.status === 500 || error?.response?.status === 502) {
      window.location.replace(publicPaths.systemError);
      return;
    }
    console.log(error);
    return Promise.reject(error.response);
  }
);

export { httpService };
