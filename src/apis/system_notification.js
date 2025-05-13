import { httpService } from 'src/libs';

export const systemNotificationApis = {
  systemNotifications: async () => {
    return await httpService.get(`/system-notifications`);
  },
  newSystemNotification: async (data) => {
    return await httpService.post(`/system-notification`, data);
  },
  updateSystemNotification: async (id, data) => {
    return await httpService.post(`/system-notification/${id}`, data);
  },
  deleteSystemNotification: async (id, isSoftDelete) => {
    return await httpService.delete(`/system-notification/${id}?is_soft_delete=${isSoftDelete}`);
  },
  enableSystemNotification: async (id) => {
    return await httpService.post(`/system-notification/${id}/deleted_flag`);
  },
};
