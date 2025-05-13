import { httpService } from 'src/libs';

export const superAdminApis = {
  superAdminLogin: async (data) => {
    return await httpService.post(`/super-admin/token`, data);
  },
  superAdmins: async () => {
    return await httpService.get(`/super-admins`);
  },
  newSuperAdmin: async (data) => {
    return await httpService.post(`/super-admin`, data);
  },
  sendSuperAdminResetPassword: async (email) => {
    return await httpService.post(`/super-admin/reset-password/verify-email?email=${email}`);
  },
  updateSuperAdminPassword: async (data) => {
    return await httpService.post(`/super-admin/password`, data);
  },
  updateSuperAdmin: async (id, data) => {
    return await httpService.post(`/super-admin/${id}`, data);
  },
  deleteSuperAdmin: async (id, isSoftDelete) => {
    return await httpService.delete(`/super-admin/${id}?is_soft_delete=${isSoftDelete}`);
  },
  enableSuperAdmin: async (id) => {
    return await httpService.post(`/super-admin/${id}/deleted_flag`);
  },
};
