import { httpService } from 'src/libs';

export const commonApis = {
  refreshToken: async () => {
    return await httpService.post(`/refresh_token`, {
      access_token: localStorage.getItem('accessToken'),
      refresh_token: localStorage.getItem('refreshToken'),
    });
  },
};
