import { httpService } from 'src/libs';

export const systemServiceApis = {
  systemServices: async () => {
    return await httpService.get(`/system-services`);
  },
  newSystemService: async (data) => {
    return await httpService.post(`/system-service`, data);
  },
  updateSystemService: async (id, data) => {
    return await httpService.post(`/system-service/${id}`, data);
  },
  deleteSystemService: async (id) => {
    return await httpService.delete(`/system-service/${id}`);
  },
  newSystemComponent: async (data) => {
    return await httpService.post(`/system-component`, data);
  },
  updateSystemComponent: async (id, data) => {
    return await httpService.post(`/system-component/${id}`, data);
  },
  deleteSystemComponent: async (id, isSoftDelete) => {
    return await httpService.delete(`/system-component/${id}?is_soft_delete=${isSoftDelete}`);
  },
  enableSystemComponent: async (id) => {
    return await httpService.post(`/system-component/${id}/deleted_flag`);
  },
};
