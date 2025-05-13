import { httpService } from 'src/libs';

export const tenantServiceApis = {
  tenantServices: async () => {
    return await httpService.get(`/tenant-services`);
  },
  updateTenantServices: async (tenant_id, data) => {
    return await httpService.post(`/tenant-services/${tenant_id}`, data);
  },
};
