import { httpService } from 'src/libs';

export const tenantApis = {
  tenants: async () => {
    return await httpService.get(`/tenants`);
  },
  newTenant: async (data) => {
    return await httpService.post(`/tenant`, data);
  },
  updateTenant: async (id, data) => {
    return await httpService.post(`/tenant/${id}`, data);
  },
  deleteTenant: async (id, isSoftDelete) => {
    return await httpService.delete(`/tenant/${id}?is_soft_delete=${isSoftDelete}`);
  },
  enableTenant: async (id) => {
    return await httpService.post(`/tenant/${id}/deleted_flag`);
  },
};
